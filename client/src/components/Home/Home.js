import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid} from '@material-ui/core'
import { useDispatch } from 'react-redux';
import { getPosts } from '../../actions/post';
import Posts from '../../components/Posts/Posts';
import Form from '../../components/Form/Form';

const Home = () => {
  const dispatch = useDispatch();
  const [ currentId, setCurrentId ] = useState(null);

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch])

  return (
    <Grow in>
      <Container>
        <Grid 
          container
          justify="space-between" 
          alignItems="strech" 
          spacing={4}>
          <Grid item xs={12} sm={7}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  )
}

export default Home
