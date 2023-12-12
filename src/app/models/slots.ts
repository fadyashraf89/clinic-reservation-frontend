export type Slots = Slot[]

export interface Slot {
  id: number
  date: string
  time: string
  availability: boolean
  doctor_id: number
}
