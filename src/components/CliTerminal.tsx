// src/components/CliTerminal.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';

const CliTerminal: React.FC = () => {
  return (
    <Box
      sx={{
        width: '100%',
        mb: 4,
        p: 2.5,
        borderRadius: 2,
        backgroundColor: '#090d16',
        border: '1px solid rgba(56, 189, 248, 0.2)',
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: '0.82rem',
        color: '#38bdf8',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)',
      }}
    >
      <Box sx={{ display: 'flex', gap: 1, mb: 1.5 }}>
        <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#ef4444' }} />
        <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#f59e0b' }} />
        <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#10b981' }} />
      </Box>

      <Typography sx={{ color: '#38bdf8', fontFamily: 'inherit', fontSize: 'inherit', mb: 0.5 }}>
        <span style={{ color: '#f59e0b' }}>yigitc@sovereign-node</span>:<span style={{ color: '#818cf8' }}>~</span>$ yigitc-cli status --all
      </Typography>

      <Typography sx={{ color: '#94a3b8', fontFamily: 'inherit', fontSize: 'inherit' }}>
        [OK] Vikunja Task OS → 1,213 tasks / 35 projects (Cloudflare Tunnel)
      </Typography>
      <Typography sx={{ color: '#94a3b8', fontFamily: 'inherit', fontSize: 'inherit' }}>
        [OK] Obsidian Vault → 300+ notes, git-synced
      </Typography>
      <Typography sx={{ color: '#94a3b8', fontFamily: 'inherit', fontSize: 'inherit' }}>
        [OK] Local RAG Engine (motor.py) → 11,405-doc corpus, citation-gated
      </Typography>
      <Typography sx={{ color: '#94a3b8', fontFamily: 'inherit', fontSize: 'inherit' }}>
        [OK] Glance Command Hub → services + RSS on one pane
      </Typography>

      <Typography sx={{ color: '#22c55e', fontFamily: 'inherit', fontSize: 'inherit', fontWeight: 600, mt: 1 }}>
        ✔ Sovereign Infrastructure Status: 100% HEALTHY
      </Typography>
    </Box>
  );
};

export default CliTerminal;
