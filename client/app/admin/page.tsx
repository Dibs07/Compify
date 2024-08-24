import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import React from 'react'

const Admin = () => {
  return (
    <div>
      <Alert
      />
      <Drawer>
        <DrawerTrigger>
            <Button>
                Click
            </Button>
        </DrawerTrigger>
        <DrawerContent>
            
        </DrawerContent>
      </Drawer>
    </div>
  )
}

export default Admin
