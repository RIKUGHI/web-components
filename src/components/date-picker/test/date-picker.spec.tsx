import { newSpecPage } from '@stencil/core/testing';
import { DatePicker } from '../date-picker';

describe('date-picker', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [DatePicker],
      html: `<date-picker></date-picker>`,
    });
    expect(page.root).toEqualHtml(`
      <date-picker>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </date-picker>
    `);
  });
});
