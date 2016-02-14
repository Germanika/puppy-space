import React, { PropTypes, Component } from 'react'
import { Card, CardMedia, CardText } from 'material-ui'

const validUrlEndings = [ '.gif', '.jpg', '.png' ]

const fixUrl = (url) => {
  let fixed = false

  validUrlEndings.map( e => {
    if (!fixed && url.endsWith(e)) {
      fixed = true
    }
  })
  return fixed ? url : `${url}.gif`
}

const isFixable = (url) => {
  return url.includes("imgur") &&
                  !url.includes('/a/') &&
                  !url.includes('/gallery/')
}

const fixGifvUrl = (url) => {
  return url.replace('.gifv', '.webm')
}

export default class Posts extends Component {
  render() {
    return (
        <div style={{ paddingTop:10, paddingBottom: 20, background:'#EEEEEE' }}>
          {this.props.posts.map((post, i) =>
            {
              return isFixable(post.url) ?
               (<Card key={i} style={
                  { margin: 'auto'
                  , marginTop: 10
                  , maxWidth:768
                  , position: 'relative'
                  }
                }>
                <CardText>
                  { post.url.endsWith('.gifv')
                    ? (<video width='100%' controls autoplay>
                        <source type='video/webm' src={fixGifvUrl(post.url)}/>
                        Your browser does not support the video tag.
                      </video>)
                    : <img style={{ "width": "100%"}}
    									     src={fixUrl(post.url)} />
                  }
                  </CardText>
                </Card>
								) :
								null
						}
        )}
      </div>
    )
  }
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired
}
