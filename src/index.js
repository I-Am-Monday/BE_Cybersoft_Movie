
const express = require('express');
const rootRouter = require('./routers/index');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-spec.json');

var options = {
  customCssUrl: 'http://localhost:8080',
};

const app = express();
app.use(express.json())


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

app.use('/api', rootRouter);

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});
