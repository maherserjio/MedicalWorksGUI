export class beneficiary {
  name: string
  relationshipId: number
  genderId: number
  date_Of_Birth: Date

  constructor(name?: string, relationshipId?: number, genderId?: number, date_Of_Birth?: Date) {
    this.name = name
    this.relationshipId = relationshipId
    this.genderId = genderId
    this.date_Of_Birth = date_Of_Birth
  }
}
