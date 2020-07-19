import React, { Component } from 'react';
//import PropTypes from "prop-types";
import axios from 'axios';
import { Select, Table, Tag } from 'antd';
import { SearchOutlined } from '@ant-design/icons';




import 'antd/dist/antd.css';
const { Option } = Select;
let timeout;
let currentValue;
function fetch(value, callback) {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = value;

  function fake() {
    console.log(value)
    const url2 = `https://i.snssdk.com/search/api/sug/?keyword=${value}`
    axios.get(url2)
      .then(response => {
        //得到响应数据
        const result = response.data.data;
        const data = []
        result.forEach(r => {
          console.log(r)
          data.push({
            keyword: r.keyword
          });
        });
        callback(data);
      })
  }

  timeout = setTimeout(fake, 100);
}

export default class Main extends Component {

  state = {
    //初始化状态
    initView: true,
    //搜索状态
    loading: false,
    //搜索到的内容
    txts: null,
    //定义错误信息
    errorMsg: null,
    searchTxt: '',
    isSearch: false,
    columns: [
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        // render: text => <a>{text}</a>,
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

    ],
    data: []
  }



  change = (e) => {
    //const url = `https://i.snssdk.com/search/api/study?keyword=${e.target.value.trim()}&offset=this.page`
    console.log('e', e)
    if (e) {
      this.setState({
        initView: false,
        loading: true,
        searchTxt: e,
        isSearch: true
      })

      console.log('this', this)
      const url = `https://i.snssdk.com/search/api/study?keyword=${e}&offset=0`
      //const url2 = `https://i.snssdk.com/search/api/sug/?keyword=${e.target.value.trim()}`

      axios.get(url)
        .then(response => {
          //得到响应数据
          const result = response.data.data;
          console.log('1', result);
          const txts = result.map(item =>
            //console.log('item', item)
            ({ title: item.title, tags: item.tags, user_name: item.user_name }));
          //更新成功的状态
          console.log('txts', txts)
          this.setState({ loading: false, txts })

        })
        .catch(error => {
          //更新失败的状态
          this.setState({ loading: false, errorMsg: error.message })
        })
    } else {
      this.setState({
        searchTxt: '',
        isSearch: false
      })
    }
  }
  handleSearch = value => {
    if (value) {
      fetch(value, data => this.setState({ data }));
    } else {
      this.change(this.state.searchTxt)
      this.setState({ data: [], initView: true });
    }
  };
  handleChange = value => {
    this.setState({ value });
    console.log('aa', this.state)
    this.change(value)
  };
  renderSearch() {
    const { initView, loading, txts, errorMsg } = this.state;
    // const { searchTxt } = this.props;
    if (initView) {
      return (
        <div>
          <h2>请输入关键字进行搜索</h2>
        </div>)

    } else if (loading) {
      return (
        <div> <h2>正在搜索中...</h2>
        </div>)
    } else if (errorMsg) {
      return (
        <div>
          <h2>{errorMsg}</h2>
        </div>
      )
    } else {
      return (
        <div>
          <Table columns={this.state.columns} dataSource={this.state.txts} ></Table>

        </div>
      )
    }
  }
  render() {
    const options = this.state.data.map(d => <Option key={d.keyword}>{d.keyword}</Option>);
    return (
      <div id='container'>
        <div className="headerbar-wrapper df-sb">
          <div className="logo df-c">
            <img src={require('../images/logo.png')} alt="LOGO" />
          </div>
          <div className="search">

            <Select
              showSearch
              value={this.state.searchTxt}
              // placeholder={this.props.placeholder}
              style={{ width: 200 }}
              defaultActiveFirstOption={false}
              showArrow={false}
              filterOption={false}
              onSearch={this.handleSearch}
              onChange={this.handleChange}
              notFoundContent={null}
              allowClear={true}
            // onInputKeyDown={this.change}
            >
              {options}
            </Select>
            <SearchOutlined className="searchicon" />


          </div>
        </div>
        {this.renderSearch()}
      </div>
    )
  }


}

