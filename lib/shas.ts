interface SefariaCalendarsResponse {
  date: string
  timezone: string
  calendar_items: {
    title: {
      he: string
      en: string
    }
    displayValue: {
      he: string
      en: string
    }
    url: string
    ref: string
    heRef: string
    order: number
    category: string
    extraDetails?: any
    description?: {
      he: string
      en: string
    }
  }[]
}

export class Shas {
  MASECHTOS: Record<string, number> = {
    ברכות: 127,
    שבת: 314,
    עירובין: 209,
    פסחים: 242,
    'ראש השנה': 69,
    יומא: 175,
    סוכה: 112,
    ביצה: 80,
    תענית: 61,
    מגילה: 63,
    'מועד קטן': 57,
    חגיגה: 53,
    יבמות: 244,
    כתובות: 224,
    נדרים: 182,
    נזיר: 132,
    סוטה: 98,
    גיטין: 180,
    קידושין: 164,
    'בבא קמא': 238,
    'בבא מציעא': 237,
    'בבא בתרא': 352,
    סנהדרין: 226,
    מכות: 48,
    שבועות: 98,
    'עבודה זרה': 152,
    הוריות: 27,
    זבחים: 240,
    מנחות: 219,
    חולין: 283,
    בכורות: 121,
    ערכין: 67,
    תמורה: 67,
    כריתות: 56,
    מעילה: 43,
    תמיד: 66,
    נדה: 145,
  }

  async getCurrentMasechet(): Promise<{ name: string; pages: number } | null> {
    const todaysDaf = await this.getTodaysDaf()
    const masechet = todaysDaf?.split(' ').slice(0, -1).join(' ')

    console.log({ masechet })
    if (!masechet) {
      return null
    }

    return { name: masechet, pages: this.MASECHTOS[masechet] }
  }

  async getTodaysDaf(): Promise<string | null> {
    const url = 'https://www.sefaria.org/api/calendars?timezone=Asia/Jerusalem'

    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: SefariaCalendarsResponse = await response.json()

    return data.calendar_items.find(item => item.title.en === 'Daf Yomi')?.displayValue.he || null
  }
}
