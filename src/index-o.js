import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
//import * as serviceWorker from './serviceWorker';
import { Table, Tag, Space } from 'antd'
import { Input } from 'antd';
// import { AudioOutlined } from '@ant-design/icons';

const { Search } = Input;


let root = document.getElementById("root")

export default class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: {},
      list: [],
      data: [],
      colums: [
        {
          title: 'Title',
          dataIndex: 'title',
          key: 'title',
          render: text => <a>{text}</a>,
        },
        {
          title: 'Description',
          dataIndex: 'description',
          key: 'description',
        },
        {
          title: 'User_name',
          dataIndex: 'user_name',
          key: 'user_name',
        },
        {
          title: 'Tags',
          key: 'tags',
          dataIndex: 'tags',
          render: tags => (
            <>
              {tags.map(tag => {
                let color = tag.length > 5 ? 'geekblue' : 'green';
                if (tag === 'loser') {
                  color = 'volcano';
                }
                return (
                  <Tag color={color} key={tag}>
                    {tag.toUpperCase()}
                  </Tag>
                );
              })}
            </>
          ),
        },

      ]
    };
    //this.search = this.search.bind(this);
  };
  // componentDidMount() {
  //   let url = 'https://i.snssdk.com/search/api/study?keyword=' + ' ' + '&offset=0'
  //   fetch(url).then((res) => res.json())
  //     .then((res) => {
  //       console.log(res.data)
  //       //this.state.data = res.data
  //       this.setState = ({ data: res.data })
  //       console.log(this.state.data)
  //       //colums = []
  //     })
  // }
  componentDidMount() {
    fetch('https://i.snssdk.com/search/api/study?keyword=' + 'k' + '&offset=0', {
      method: 'GET'

    })
      .then(res => res.json())
      .then((res) => {
        console.log(res.data)
        this.setState({
          data: res.data
        }, function () {
          console.log(this.state.data)
          let com = this.state.data.map((item, index) => {
            return <li key={index}>{item}</li>
          })
          // let com = Object.keys(this.state.data).map((item, index) => {
          //   //console.log(item.title)
          //   return <li key={index}>{item}</li>
          // })
          this.setState({
            arr: com
          }, function () {
            console.log(this.state.arr)
          })
        })
      })
  }
  search = (e) => {
    console.log('hhhh')
    if (e.target.value) {
      let url = 'https://i.snssdk.com/search/api/study?keyword=' + e.target.value + '&offset=0'
      fetch(url).then((res) => res.json())
        .then((res) => {
          console.log(res.data)
          const d = res.data
          //this.state.data = res.data
          this.setState = ({ data: d })
          console.log(this.state.data)
          //colums = []
        })
    }
  };
  render() {
    return (
      //console.log(this.state.data) 

      < div >
        {/* <Search
          placeholder="input search text"
          onSearch={value => console.log(value)}
          style={{ width: 200 }}
        /> */}
        < Search placeholder="input search text" onSearch={value => console.log(value)} enterButton />
        <div className="serch-block">
          <input type='text' placeholder='请搜索' onChange={this.search}></input>
        </div>
        <div className='display'>
          {/* {this.state.data} */}
          {/* <Table dataSource={this.state.data} colums={this.state.colums} ></Table> */}
        </div>
        <div>
          <ul>
            {
              this.state.arr
            }
          </ul>
        </div>
      </div >
    )

  }
}
ReactDOM.render(<Test />, root)
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
