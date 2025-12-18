import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import rotationRoutes from './routes/rotationRoutes.js';
import portfolioRoutes from './routes/portfolioRoutes.js';
import settingsRoutes from './routes/settingsRoutes.js';
import brokerageRoutes from './routes/brokerageRoutes.js';

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.json({ status: 'ok', service: 'R Capital Backend API' });
});

app.use('/api/rotation', rotationRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/brokerage', brokerageRoutes);

export default app;
