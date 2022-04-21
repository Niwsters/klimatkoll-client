import { TextConfig } from './models/text-config'
import { Environment } from './root/environment'

export async function getTextConfig(environment: Environment): Promise<TextConfig> {
  const response: Response = await fetch(`${environment.serverUrl}/${environment.language}/text.json`)
  const textConfig: TextConfig = await response.json()
  return textConfig
}
