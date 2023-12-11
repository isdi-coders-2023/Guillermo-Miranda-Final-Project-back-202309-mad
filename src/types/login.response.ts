import { UserStructure } from "../entities/user"

export type loginResponse = {
  user: UserStructure,
  token: string
}
