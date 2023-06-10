import { newE2EPage } from '@stencil/core/testing';

describe('prev-next-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<prev-next-button></prev-next-button>');

    const element = await page.find('prev-next-button');
    expect(element).toHaveClass('hydrated');
  });
});
