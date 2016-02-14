import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { selectReddit, fetchPostsIfNeeded, invalidateReddit } from '../actions'
import Picker from '../components/Picker'
import Posts from '../components/Posts'
import { Card, AppBar, CardText, RaisedButton } from 'material-ui'


class App extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }

  componentDidMount() {
    const { dispatch, selectedReddit } = this.props
    dispatch(fetchPostsIfNeeded(selectedReddit))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedReddit !== this.props.selectedReddit) {
      const { dispatch, selectedReddit } = nextProps
      dispatch(fetchPostsIfNeeded(selectedReddit))
    }
  }

  handleChange(event, index, value) {
    this.props.dispatch(selectReddit(value))
  }

  handleRefreshClick(e) {
    e.preventDefault()

    const { dispatch, selectedReddit } = this.props
    dispatch(invalidateReddit(selectedReddit))
    dispatch(fetchPostsIfNeeded(selectedReddit))
  }

  render() {
    const  { selectedReddit
           , posts
           , isFetching
           , lastUpdated
           } = this.props
    const isEmpty = posts.length === 0
    return (
      <div>
        <Card>
          <CardText>
        <AppBar title="The Puppy Space!"
                style={{ background:'#FF4081'
                       , height: 120
                       , paddingTop: 24
                       }}
                showMenuIconButton={false}/>
              <Card style={
                { background:'#EEEEEE'
                , margin: 10
                }}>
              <CardText>
              <Picker value={selectedReddit}
                  onChange={this.handleChange}
                  options={[ 'dogpictures'
                           , 'puppies'
                           , 'lookatmydog'
                           , 'puppygifs'
                           , 'puppysmiles'
                           , 'awww'
                           ]} />
                {lastUpdated &&
                  <span style={{ display:'inline-block', marginLeft:20 }}>
                    Last updated at {
                      new Date(lastUpdated).toLocaleTimeString()
                    }.
                    {' '}
                  </span>
                }
                {!isFetching &&
                  <RaisedButton secondary={true}
                                onTouchEnd={this.handleRefreshClickD}
                                label='Refresh'
                                style={
                                  { marginLeft:20}
                                }/>
                }
              </CardText>
              </Card>
              <Card>
              {isEmpty
                ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
                : (<div style={{ opacity: isFetching ? 0.5 : 1 }}>
                     <Posts posts={posts} />
                   </div>)
              }
              </Card>
          </CardText>
        </Card>
        <footer style={{ color: 'white'
                       , background: '#212121'
                       , width: '100%'
                       , height: '120px'
                       , position: 'absolute'
                       , left: -4
                       }}>
          <p style={{ textAlign:'center'
                    , paddingTop:'37px'
                    , fontFamily:'verdana'
                    }}>
              {"For Emma. Enjoy the puppies! ♥"}
            </p>
        </footer>
      </div>
    )
  }
}

App.propTypes = {
  selectedReddit: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { selectedReddit, postsByReddit } = state
  const {
    isFetching,
    lastUpdated,
    items: posts
  } = postsByReddit[selectedReddit] || {
    isFetching: true,
    items: []
  }

  return {
    selectedReddit,
    posts,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(App)
