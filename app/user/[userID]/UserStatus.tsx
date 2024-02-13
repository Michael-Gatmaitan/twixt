import { Badge } from '@/components/ui/badge'
import React from 'react'

const UserStatus = ({ status }: { status: string }) => {
  return (
    <Badge variant="secondary">
      {status}
    </Badge>
  )
}

export default UserStatus
