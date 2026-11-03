export type Room = {
  id: number
  name: string
  description: string
  imageUrl: string
}

export type CreatedRoom = Room & {
  inviteUrl: string
}

export type CreateRoomRequest = {
  name: string
  description: string
  image: File | null
  password: string | null
}
