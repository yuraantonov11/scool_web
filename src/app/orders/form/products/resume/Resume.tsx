import { FC } from 'react';
import { Box, Card, Typography } from '@mui/material';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';

import ProductDB from '../../../../../interfaces/ProductDB';
import { OrderedProduct, OrderedProducts } from '../Products';
import FormProductsSummaryDetail from './product/Product';
import CenterAbsolute from '../../../../shared/center-absolute/CenterAbsolute';

const FormProductsSummary: FC<{
  products: OrderedProducts;
  onChangeProduct: (product: ProductDB, orderedProduct: OrderedProduct) => void;
  onDeleteProduct: (product: ProductDB) => void;
}> = ({ products, onChangeProduct, onDeleteProduct }) => {
  const handleChangeQuantity = (product: ProductDB, newQuantity: number) => {
    onChangeProduct(product, { product, quantity: newQuantity });
  };

  return (
    <Card
      sx={{
        p: 3,
        height: { md: 526 },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h6" sx={{ mb: 3 }}>
        Резюме
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          overflowY: 'auto',
        }}
      >
        {Object.values(products).length ? (
          Object.values(products).map((value) => (
            <FormProductsSummaryDetail
              {...value}
              key={value.product.id}
              onChangeValue={handleChangeQuantity}
              onDelete={onDeleteProduct}
            />
          ))
        ) : (
          <CenterAbsolute>
            <Box>
              <ProductionQuantityLimitsIcon
                sx={{ margin: '0 auto', display: 'block' }}
              />
              <Typography variant="body2" color="textSecondary" mt={2}>
                Немає вибраних продуктів
              </Typography>
            </Box>
          </CenterAbsolute>
        )}
      </Box>
    </Card>
  );
};

export default FormProductsSummary;
