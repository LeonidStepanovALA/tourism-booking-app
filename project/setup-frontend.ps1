# Create frontend directory if it doesn't exist
New-Item -ItemType Directory -Force -Path frontend

# Navigate to frontend directory
Set-Location frontend

# Initialize a new React TypeScript project
npm init -y

# Install dependencies
npm install --save react react-dom react-router-dom @mui/material @mui/icons-material @emotion/react @emotion/styled
npm install --save-dev typescript @types/react @types/react-dom @types/node

# Create tsconfig.json
$tsconfig = @"
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"],
  "exclude": ["node_modules"]
}
"@

Set-Content -Path "tsconfig.json" -Value $tsconfig

# Return to root directory
Set-Location .. 