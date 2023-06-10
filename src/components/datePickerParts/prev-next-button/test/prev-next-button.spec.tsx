import { newSpecPage } from '@stencil/core/testing';
import { PrevNextButton } from '../prev-next-button';

describe('prev-next-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [PrevNextButton],
      html: `<prev-next-button></prev-next-button>`,
    });
    expect(page.root).toEqualHtml(`
      <prev-next-button>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </prev-next-button>
    `);
  });
});
