import React from 'react';
import { Container, Grid, Typography, Card, CardMedia, CardContent, CardActions, Button } from '@mui/material';

const Checkoutpage = ({ cart, onRemove }) => {
  return (
    <Container maxWidth="lg" style={{ padding: '2rem 0' }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Checkout
      </Typography>
      {cart.length === 0 ? (
        <Typography variant="body1">No items in the cart.</Typography>
      ) : (
        <Grid container spacing={4}>
          {cart.map((item, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <Card>
                <CardMedia
                  component="img"
                  alt={item.Product}
                  height="200"
                  image={item.Image}
                  title={item.Product}
                />
                <CardContent>
                  <Typography variant="h5" component="h2" gutterBottom>
                    {item.Product}
                  </Typography>
                  <Typography variant="h6" component="p">
                    Price: ${item.Price}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary" onClick={() => onRemove(item._id)}>
                    Remove
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Checkoutpage;
