import { newSpecPage } from '@stencil/core/testing';
import { MonthYearSwitcher } from '../month-year-switcher';

describe('month-year-switcher', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MonthYearSwitcher],
      html: `<month-year-switcher></month-year-switcher>`,
    });
    expect(page.root).toEqualHtml(`
      <month-year-switcher>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </month-year-switcher>
    `);
  });
});
