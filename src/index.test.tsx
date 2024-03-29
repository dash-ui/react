/* eslint-disable testing-library/no-manual-cleanup */
/* jest */
import { createDash, createStyles, styles } from "@dash-ui/styles";
import { render as renderComponent } from "@testing-library/react";
import { cleanup, renderHook } from "@testing-library/react-hooks";
import * as React from "react";
import { Inline, useCSS, useGlobal, useThemes, useTokens } from "./index";

afterEach(() => {
  document.getElementsByTagName("html")[0].innerHTML = "";
});

const renderFragment = (children: any = null, options: any = {}) =>
  renderComponent(children, {
    ...options,
  }).asFragment();

declare module "@dash-ui/styles" {
  interface DashTokens {
    color: {
      primary: string;
      secondary?: string;
    };
  }

  interface DashThemes {
    light: DashTokens;
    dark: DashTokens;
  }
}

describe("<Inline>", () => {
  afterEach(cleanup);

  it("writes css", () => {
    expect(
      renderFragment(
        <Inline
          styles={styles}
          css={`
            display: block;
          `}
        />
      )
    ).toMatchSnapshot();
  });

  it("writes css w/ nonce", () => {
    const myStyles = createStyles({
      dash: createDash({ nonce: "E8gagwlWEGlgwel" }),
    });
    expect(
      renderFragment(
        <Inline
          styles={myStyles}
          css={`
            display: block;
          `}
        />
      )
    ).toMatchSnapshot();
  });

  it("writes css object", () => {
    expect(
      renderFragment(<Inline styles={styles} css={{ display: "block" }} />)
    ).toMatchSnapshot();
  });

  it("writes css callback", () => {
    const myStyles = createStyles({ tokens: { color: { primary: "#000" } } });

    expect(
      renderFragment(
        <Inline
          styles={myStyles}
          css={({ color }) => `color: ${color.primary};`}
        />
      )
    ).toMatchSnapshot();
  });

  it(`doesn't write falsy css callback`, () => {
    const myStyles = createStyles();
    myStyles.insertTokens({ color: { primary: "#000" } });

    expect(
      renderFragment(<Inline styles={myStyles} css={""} />)
    ).toMatchSnapshot();
  });
});

describe("useGlobal()", () => {
  it("sets global styles with a string value", async () => {
    const myStyles = createStyles();
    const { unmount, rerender } = renderHook(() =>
      useGlobal(myStyles, `:root { --blue: #09a; }`)
    );

    rerender();
    expect(document.querySelectorAll(`style[data-dash]`).length).toBe(2);
    expect(
      cssRules(document.querySelectorAll(`style[data-dash]`)[1])[0].cssText
    ).toMatchSnapshot(":root");
    unmount();
    expect(document.querySelectorAll(`style[data-dash]`).length).toBe(1);
    await cleanup();
  });

  it("sets global styles with a function value", async () => {
    const myStyles = createStyles();
    myStyles.insertTokens({ color: { primary: "#000", secondary: "#fff" } });
    const { unmount, rerender } = renderHook(() =>
      useGlobal(
        myStyles,
        ({ color }) => `body { background: ${color.primary}; }`
      )
    );

    rerender();
    expect(document.querySelectorAll(`style[data-dash]`).length).toBe(3);
    expect(
      cssRules(document.querySelectorAll(`style[data-dash]`)[1])[0].cssText
    ).toMatchSnapshot("tokens");
    expect(
      cssRules(document.querySelectorAll(`style[data-dash]`)[2])[0].cssText
    ).toMatchSnapshot("global");
    unmount();
    expect(document.querySelectorAll(`style[data-dash]`).length).toBe(2);
    await cleanup();
  });

  it("handles falsy values", async () => {
    const myStyles = createStyles();
    renderHook(() => useGlobal(myStyles, false));
    expect(document.querySelectorAll(`style[data-dash]`).length).toBe(1);

    renderHook(() => useGlobal(myStyles, 0));
    expect(document.querySelectorAll(`style[data-dash]`).length).toBe(1);

    renderHook(() => useGlobal(myStyles, null));
    expect(document.querySelectorAll(`style[data-dash]`).length).toBe(1);

    renderHook(() => useGlobal(myStyles, ""));
    expect(document.querySelectorAll(`style[data-dash]`).length).toBe(1);
    await cleanup();
  });
});

describe("useTokens()", () => {
  afterEach(cleanup);

  it("adds tokens then cleans up", async () => {
    const myStyles = createStyles();
    const { unmount, rerender } = renderHook(() =>
      useTokens(myStyles, {
        color: { primary: "#000", secondary: "#fff" },
      })
    );

    rerender();
    expect(document.querySelectorAll(`style[data-dash]`).length).toBe(2);
    expect(
      cssRules(document.querySelectorAll(`style[data-dash]`)[1])[0].cssText
    ).toMatchSnapshot(":root");
    unmount();
    expect(document.querySelectorAll(`style[data-dash]`).length).toBe(1);
    await cleanup();
  });
});

describe("useThemes()", () => {
  afterEach(cleanup);

  it("adds tokens then cleans up", async () => {
    const { unmount, rerender } = renderHook(() =>
      useThemes(createStyles(), {
        dark: {
          color: { primary: "#000", secondary: "#fff" },
        },
        light: {
          color: { primary: "#fff", secondary: "#000" },
        },
      })
    );

    rerender();
    expect(document.querySelectorAll(`style[data-dash]`).length).toBe(4);
    expect(
      cssRules(document.querySelectorAll(`style[data-dash]`)[2])[0].cssText
    ).toMatchSnapshot();
    expect(
      cssRules(document.querySelectorAll(`style[data-dash]`)[3])[0].cssText
    ).toMatchSnapshot();
    unmount();
    expect(document.querySelectorAll(`style[data-dash]`).length).toBe(2);
    await cleanup();
  });
});

describe("useCSS", () => {
  it("should insert into the DOM and return class names", () => {
    const myStyles = createStyles({ tokens: { color: { primary: "#000" } } });

    const { result } = renderHook(() =>
      useCSS(myStyles, {
        root: "display: block;",
        button: {
          display: "inline-block",
        },
        fish(t) {
          return {
            color: t.color.primary,
          };
        },
        fosh: myStyles.one("display: flex;"),
      })
    );

    expect(result.current.root).toMatch(/ui-\w+/);
    expect(result.current.button).toMatch(/ui-\w+/);
    expect(result.current.fish).toMatch(/ui-\w+/);
    expect(result.current.fosh).toMatch(/ui-\w+/);

    const rules = cssRules();

    expect(rules[0].cssText).toMatch(/display: block;/);
    expect(rules[0].selectorText).toBe("." + result.current.root);

    expect(rules[1].cssText).toMatch(/display: inline-block;/);
    expect(rules[1].selectorText).toBe("." + result.current.button);

    expect(rules[2].cssText).toMatch(/color: var\(--color-primary\);/);
    expect(rules[2].selectorText).toBe("." + result.current.fish);

    expect(rules[3].cssText).toMatch(/display: flex;/);
    expect(rules[3].selectorText).toBe("." + result.current.fosh);
  });
});

function cssRules(
  element: any = document.querySelectorAll(`style[data-dash]`)[0]
): CSSStyleRule[] {
  return element.sheet.cssRules;
}
