import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core'
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
import { getPosts } from '../../actions/post';
import Posts from '../../components/Posts/Posts';
import Form from '../../components/Form/Form';
import Pagination from '../Pagination';
import useStyles from './styles'
import { getPostsBySearch } from '../../actions/post';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const query = useQuery();
  const page = query.get('page') || 1; // read the url and see if there's 'page' in it and find our location
  const searchQuery = query.get('searchQuery');
  const tagsQuery = query.get('tags');

  const [ currentId, setCurrentId ] = useState(null);
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') { //enter
      searchPost()
    }

  }

  const handleAddChip = (tag) => setTags([...tags, tag]);

  const handleDeleteChip = (chipToDelete) => setTags(tags.filter((tag) => tag !== chipToDelete));

  const searchPost = () => {
    // search keywords or tags
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags: tags.join(',') })) //can not pass array to
      navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)
    } else {
      navigate('/')
    }
  }

  useEffect(() => {
    if (searchQuery || tagsQuery) {
      dispatch(getPostsBySearch({ search: searchQuery, tags: tagsQuery }));
    }
  }, [])
  
  return (
    <Grow in>
      <Container>
        <Grid container justify="space-between" alignItems="strech" spacing={3} className={classes.gridContainer}>
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar className={classes.appBarSearch} position="static" color="inherit">
              <TextField  onKeyPress={handleKeyPress} name="search" variant="outlined" label="Search Memories" fullWidth value={search} onChange={(e) => setSearch(e.target.value)} />
              <ChipInput
                style={{ margin: '10px 0' }}
                value={tags}
                onAdd={(chip) => handleAddChip(chip)}
                onDelete={(chip) => handleDeleteChip(chip)}
                label="Search Tags"
                variant="outlined"
              />
              <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Search</Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {(!searchQuery && !tags.length) && (
              <Paper className={classes.pagination} elevation={6}>
                <Pagination page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  )
}

export default Home
