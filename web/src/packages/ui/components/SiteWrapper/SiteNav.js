import React from 'react'
import cn from 'classnames'
import { Container, Grid, Nav } from 'tabler-react'

export const SiteNav = ({
  children,
  items,
  itemsObjects,
  withSearchForm = true,
  rightColumnComponent,
  collapse = true,
  routerContextComponentType
}) => {
  const classes = cn('header d-lg-flex p-0', { collapse })
  return (
    <div className={classes}>
      <Container>
        {children || (
          <Grid.Row className='align-items-center'>
            <Grid.Col lg={3} className='ml-auto' ignoreCol>
              {/* @TODO: add InlineSearchForm  */}
              {/* {rightColumnComponent || (withSearchForm && <InlineSearchForm />)} */}
              {rightColumnComponent}
            </Grid.Col>
            <Grid.Col className='col-lg order-lg-first'>
              <Nav
                tabbed
                className='border-0 flex-column flex-lg-row'
                items={items}
                itemsObjects={itemsObjects}
                routerContextComponentType={routerContextComponentType}
              />
            </Grid.Col>
          </Grid.Row>
        )}
      </Container>
    </div>
  )
}
