import { newSpecPage } from '@stencil/core/testing';
import { DateItem } from '../date-item';

describe('date-item', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [DateItem],
      html: `<date-item></date-item>`,
    });
    expect(page.root).toEqualHtml(`
      <date-item>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </date-item>
    `);
  });
});
