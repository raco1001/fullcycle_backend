import { app } from './app'
import { PORT } from './settings'

// App entry point

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
