import React, { PropTypes, Component } from 'react'
import { Card, CardMedia, CardText } from 'material-ui'

const validUrlEndings = [ '.gif', '.gifv', '.jpg', '.png' ]

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
  const result = url.includes("imgur") &&
                  !url.includes('/a/') &&
                  !url.includes('/gallery/')
  if (!result) console.log(url)
  return result
}

export default class Posts extends Component {
  render() {
    return (
      <ul>
        {this.props.posts.map((post, i) =>
            {
              return isFixable(post.url) ?
               (<Card key={i} style={{"maxWidth":"80%"}}>
                <CardText>
                   <img style={{ "width": "100%"}}
    									src={fixUrl(post.url)} />
                  </CardText>
                </Card>
								) :
								null
						}
        )}
      </ul>
    )
  }
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired
}
