/**
 * @jest-environment node
 */
import { createDash, createStyles, styles } from "@dash-ui/styles";
import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Style } from "./index";

describe("<Style>", () => {
  it("creates <style> tag based on html string", () => {
    const styles = createStyles();
    const style = styles.variants({
      default: "display: block;",
    });
    const Component = () => <div className={style()} />;

    const result = renderToStaticMarkup(
      <Style html={renderToStaticMarkup(<Component />)} styles={styles} />
    );

    expect(result).toMatchSnapshot();
  });

  it("creates <style> tag with nonce", () => {
    const styles = createStyles({ dash: createDash({ nonce: "abc" }) });
    const style = styles.variants({
      default: "display: block;",
    });
    const Component = () => <div className={style()} />;
    const result = renderToStaticMarkup(
      <Style html={renderToStaticMarkup(<Component />)} styles={styles} />
    );

    expect(result).toMatchSnapshot();
  });

  it("creates <style> tag with cache key", () => {
    const styles = createStyles({ dash: createDash({ key: "abc" }) });
    const style = styles.variants({
      default: "display: block;",
    });
    const Component = () => <div className={style()} />;
    const result = renderToStaticMarkup(
      <Style html={renderToStaticMarkup(<Component />)} styles={styles} />
    );

    expect(result).toMatchSnapshot();
  });

  it("creates <style> tag with default styles function", () => {
    const style = styles.variants({
      default: "display: block;",
    });
    const Component = () => <div className={style()} />;
    const result = renderToStaticMarkup(
      <Style html={renderToStaticMarkup(<Component />)} />
    );

    expect(result).toMatchSnapshot();
  });
});
