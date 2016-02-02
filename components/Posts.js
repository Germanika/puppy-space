import React, { PropTypes, Component } from 'react'

export default class Posts extends Component {
  render() {
    return (
      <ul>
        {this.props.posts.map((post, i) =>
            <li key={i}>{
              post.url && post.url.includes("imgur") ?
                <img style={{"max-width" : "75%", "max-height": "device-height"}} src={post.url + ".jpg"} /> :
                post.title
              }</li>
        )}
      </ul>
    )
  }
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired
}
