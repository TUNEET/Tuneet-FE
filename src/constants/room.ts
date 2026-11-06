import type { RoomMemberRole } from '@/types/room'

export const ROOM_ROLE_LABELS: Record<RoomMemberRole, string> = {
  owner: '방장',
  member: '멤버',
}

export const ROOM_HOME_PREVIEW_COUNT = 2
