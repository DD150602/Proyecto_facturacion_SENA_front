import React, { useState } from 'react'
import Sidebar from '../../components/siderbarComponent'
import StackCumston from '../../components/stackComponent'
import InformesCobros from '../../components/informesCobros'
import { Tabs, Tab, Box, Typography } from '@mui/material'
import PaymentComponent from '../../components/payment'

function TabPanel (props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps (index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

export default function InformeVendedor () {
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <>
      <Sidebar />
      <StackCumston>
        <h1 className='flex justify-center text-5xl font-bold text-blue-fond p-2 rounded-lg'>
          Gestión de informes
        </h1>
        <Tabs value={value} onChange={handleChange} aria-label='simple tabs example'>
          <Tab label='Informe de cobros' {...a11yProps(0)} />
          <Tab label='Generar cobro' {...a11yProps(1)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <div className='p-4 '>
            <InformesCobros />
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <PaymentComponent />
        </TabPanel>
      </StackCumston>
    </>
  )
}
