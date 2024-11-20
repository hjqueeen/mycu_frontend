import { Layout, PageType } from '../../shared/components/Layout/Layout';

export const Shipping = () => {
  return (
    <Layout
      pageType={PageType.Shipping}
      rightComponent={<>Shipping</>}
      rightComponentName={PageType.Shipping}
    />
  );
};
