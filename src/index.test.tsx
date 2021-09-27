/* eslint-disable testing-library/no-manual-cleanup */
/* jest */
import { createDash, createStyles, styles } from "@dash-ui/styles";
import { render as renderComponent } from "@testing-library/react";
import { cleanup, renderHook } from "@testing-library/react-hooks";
import * as React from "react";
import {
  DashProvider,
  Inline,
  useDash,
  useGlobal,
  useThemes,
  useTokens,
} from "./index";

afterEach(() => {
  document.getElementsByTagName("html")[0].innerHTML = "";
});

const opt = (props = {}) => ({
  wrapper: (other) => <DashProvider {...props} {...other} />,
});

const renderFragment = (children = null, props = {}, options = {}) =>
  renderComponent(children, {
    wrapper: ({ children }) => <DashProvider {...props} children={children} />,
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

describe("<DashProvider>", () => {
  afterEach(cleanup);

  it("provides the default styles() configuration", () => {
    const { result } = renderHook(() => useDash(), opt());
    expect(result.current.styles).toBe(styles);
  });

  it("provides a custom styles() configuration", () => {
    const myStyles = createStyles();
    const { result } = renderHook(() => useDash(), opt({ styles: myStyles }));
    expect(result.current.styles).toBe(myStyles);
  });

  it("works without a provider", () => {
    const { result } = renderHook(() => useDash());
    expect(result.current.styles).toBe(styles);
  });
});

describe("<Inline>", () => {
  afterEach(cleanup);

  it("writes css", () => {
    expect(
      renderFragment(
        <Inline
          css={`
            display: block;
          `}
        />,
        { styles }
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
          css={`
            display: block;
          `}
        />,
        { styles: myStyles }
      )
    ).toMatchSnapshot();
  });

  it("writes css object", () => {
    expect(
      renderFragment(<Inline css={{ display: "block" }} />, { styles })
    ).toMatchSnapshot();
  });

  it("writes css callback", () => {
    const myStyles = createStyles({ tokens: { color: { primary: "#000" } } });

    expect(
      renderFragment(
        <Inline css={({ color }) => `color: ${color.primary};`} />,
        {
          styles: myStyles,
        }
      )
    ).toMatchSnapshot();
  });

  it(`doesn't write falsy css callback`, () => {
    const myStyles = createStyles();
    myStyles.insertTokens({ color: { primary: "#000" } });

    expect(
      renderFragment(<Inline css={""} />, {
        styles: myStyles,
      })
    ).toMatchSnapshot();
  });
});

describe("useGlobal()", () => {
  it("sets global styles with a string value", async () => {
    const myStyles = createStyles();
    const { unmount, rerender } = renderHook(
      () => useGlobal(`:root { --blue: #09a; }`),
      opt({ styles: myStyles })
    );

    rerender();
    expect(document.querySelectorAll(`style[data-dash]`).length).toBe(1);
    expect(document.querySelectorAll(`style[data-dash]`)[0]).toMatchSnapshot(
      ":root"
    );
    unmount();
    expect(document.querySelectorAll(`style[data-dash]`).length).toBe(0);
    await cleanup();
  });

  it("sets global styles with a function value", async () => {
    const myStyles = createStyles();
    myStyles.insertTokens({ color: { primary: "#000", secondary: "#fff" } });
    const { unmount, rerender } = renderHook(
      () => useGlobal(({ color }) => `body { background: ${color.primary}; }`),
      opt({ styles: myStyles })
    );

    rerender();
    expect(document.querySelectorAll(`style[data-dash]`).length).toBe(2);
    expect(document.querySelectorAll(`style[data-dash]`)[0]).toMatchSnapshot(
      "tokens"
    );
    expect(document.querySelectorAll(`style[data-dash]`)[1]).toMatchSnapshot(
      "global"
    );
    unmount();
    expect(document.querySelectorAll(`style[data-dash]`).length).toBe(1);
    await cleanup();
  });

  it("handles falsy values", async () => {
    const myStyles = createStyles();
    renderHook(() => useGlobal(false), opt({ styles: myStyles }));
    expect(document.querySelectorAll(`style[data-dash]`).length).toBe(0);

    renderHook(() => useGlobal(0), opt({ styles: myStyles }));
    expect(document.querySelectorAll(`style[data-dash]`).length).toBe(0);

    renderHook(() => useGlobal(null), opt({ styles: myStyles }));
    expect(document.querySelectorAll(`style[data-dash]`).length).toBe(0);

    renderHook(() => useGlobal(""), opt({ styles: myStyles }));
    expect(document.querySelectorAll(`style[data-dash]`).length).toBe(0);
    await cleanup();
  });
});

describe("useTokens()", () => {
  afterEach(cleanup);

  it("adds tokens then cleans up", async () => {
    const myStyles = createStyles();
    const { unmount, rerender } = renderHook(
      () =>
        useTokens({
          color: { primary: "#000", secondary: "#fff" },
        }),
      opt({ styles: myStyles })
    );

    rerender();
    expect(document.querySelectorAll(`style[data-dash]`).length).toBe(1);
    expect(document.querySelectorAll(`style[data-dash]`)[0]).toMatchSnapshot(
      ":root"
    );
    unmount();
    expect(document.querySelectorAll(`style[data-dash]`).length).toBe(0);
    await cleanup();
  });
});

describe("useThemes()", () => {
  afterEach(cleanup);

  it("adds tokens then cleans up", async () => {
    const { unmount, rerender } = renderHook(
      () =>
        useThemes({
          dark: {
            color: { primary: "#000", secondary: "#fff" },
          },
          light: {
            color: { primary: "#fff", secondary: "#000" },
          },
        }),
      opt({ styles: createStyles() })
    );

    rerender();
    expect(document.querySelectorAll(`style[data-dash]`).length).toBe(2);
    expect(document.querySelectorAll(`style[data-dash]`)[0]).toMatchSnapshot();
    expect(document.querySelectorAll(`style[data-dash]`)[1]).toMatchSnapshot();
    unmount();
    expect(document.querySelectorAll(`style[data-dash]`).length).toBe(0);
    await cleanup();
  });
});
