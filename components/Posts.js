import React, { PropTypes, Component } from 'react'
import { Card, CardMedia, CardText } from 'material-ui'

export default class Posts extends Component {
  render() {
    return (
      <ul>
        {this.props.posts.map((post, i) =>
            {
              return post.url && post.url.includes("imgur") ?
               (<Card key={i} style={{"maxWidth":"80%"}}>
                <CardText>
                   <img style={{ "width": "100%"}}
    									src={post.url + ".jpg"} />
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
