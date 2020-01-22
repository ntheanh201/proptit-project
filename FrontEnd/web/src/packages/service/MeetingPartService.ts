import BaseService from './BaseService'

interface MeetingPart {
  id: number
  url?: string
  meeting_session?: string
  name: string
  start_time?: Date
  end_time?: Date
}

class MeetingPartService extends BaseService<MeetingPart> {
  constructor() {
    super()
    this.baseURL += '/parts'
  }
}

export const meetingPartService = new MeetingPartService()
