import { newSpecPage } from '@stencil/core/testing';
import { SingleDatePicker } from '../single-date-picker';

describe('single-date-picker', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SingleDatePicker],
      html: `<single-date-picker></single-date-picker>`,
    });
    expect(page.root).toEqualHtml(`
      <single-date-picker>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </single-date-picker>
    `);
  });
});
