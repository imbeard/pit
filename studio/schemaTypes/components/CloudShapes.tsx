// ./schemas/components/CloudShapes.tsx

import {StringInputProps, set} from 'sanity'
import {Stack, Button, Grid, Label, Box} from '@sanity/ui'
import {useCallback} from 'react'

const MASKS = [
  {title: 'CloudShape 1', value: 'CloudShape-1', image: '../../static/clouds/1.png'},
  {title: 'CloudShape 2', value: 'CloudShape-2', image: '../../static/clouds/2.png'},
  {title: 'CloudShape 3', value: 'CloudShape-3', image: '../../static/clouds/3.png'},
  {title: 'CloudShape 4', value: 'CloudShape-4', image: '../../static/clouds/4.png'},
  {title: 'CloudShape 5', value: 'CloudShape-5', image: '../../static/clouds/5.png'},
]

export function CloudShapes(props: StringInputProps) {
  const {value, onChange} = props

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const nextValue = event.currentTarget.value
      onChange(set(nextValue))
    },
    [onChange],
  )

  return (
    <Grid columns={3} gap={3}>
      {MASKS.map((mask) => (
        <Button
          key={mask.value}
          value={mask.value}
          mode={value === mask.value ? `default` : `ghost`}
          tone={value === mask.value ? `primary` : `default`}
          onClick={handleClick}
        >
          <Stack space={2} padding={2}>
            <Box>
              <img src={mask.image} alt={mask.title} style={{width: '100%', height: 'auto'}} />
            </Box>
          </Stack>
        </Button>
      ))}
    </Grid>
  )
}
