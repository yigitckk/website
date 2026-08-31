// src/components/TelemetryGauges.tsx
import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const metrics = [
  { value: '42.8', label: 'LLM Speed (tok/s)' },
  { value: '14.2K', label: 'Graph RAG Nodes' },
  { value: '60 FPS', label: 'Gaming Stream' },
  { value: '0 TL', label: 'Stack Cost / Mo' },
];

const TelemetryGauges: React.FC = () => {
  const theme = useTheme();

  return (
    <Box sx={{ width: '100%', mb: 4 }}>
      <Typography
        variant="overline"
        sx={{ color: theme.palette.text.secondary, letterSpacing: 2, mb: 1.5, display: 'block' }}
      >
        Real-Time System Telemetry
      </Typography>

      <Grid container spacing={2}>
        {metrics.map((m) => (
          <Grid item xs={6} sm={3} key={m.label}>
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                backgroundColor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`,
                textAlign: 'center',
              }}
            >
              <Typography
                variant="h5"
                sx={{ fontWeight: 700, color: theme.palette.primary.main, fontFamily: 'monospace' }}
              >
                {m.value}
              </Typography>
              <Typography variant="caption" sx={{ color: theme.palette.text.secondary, textTransform: 'uppercase' }}>
                {m.label}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TelemetryGauges;
