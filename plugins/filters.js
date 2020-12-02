import { formatDistanceToNow } from 'date-fns'

export const date = value => {
  return new Intl.DateTimeFormat('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(value))
}

export const timeAgo = value => formatDistanceToNow(new Date(value), { addSuffix: true })
