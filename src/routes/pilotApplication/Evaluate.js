import React from 'react';
import { Form, Card, Button, Input, Tabs, message ,InputNumber} from 'antd';
import './pilotApplicationEdit.css'
const { TextArea } = Input;
const { TabPane } = Tabs;

function Evaluate(props) {
  let { form, loading, edit, onSubmit, changeEvaluate, memberType, evaluateTab, activeEvaluateTab, evaluateList, id, status = 1 } = props;
  const { getFieldDecorator, validateFields } = form;
  console.log(status, 'statusstatus')
  /** 布局 */
  const formItemLayout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 8 },
  }
  //提交
  function handleSubmit(type, id) {
    validateFields((err, values) => {
      console.log(err, 'err', values)
      if (err) {
        return;
      }
      let { grade0, grade1, grade2, grade3, grade4, grade5, grade6 } = values;
      let arr = [grade0, grade1, grade2, grade3, grade4, grade5, grade6];
      let bfh = 1;
      arr.map(item => {
        if (Math.round(item < 0) || Math.round(item > 100)) {
          bfh = 2;
        }
      })
      if (bfh == 2) {
        message.warning('请不要输入不在0-100内的评分');
        return;
      }
      let data = {
        id, type, evaluaContent: [{
          name: '建设目标',
          grade: Math.round(values.grade0),
          content: values.content0
        }, {
          name: '组织架构',
          grade: Math.round(values.grade1),
          content: values.content1
        }, {
          name: '活动内容',
          grade: Math.round(values.grade2),
          content: values.content2
        }, {
          name: '阵地整合',
          grade: Math.round(values.grade3),
          content: values.content3
        }, {
          name: '队伍组建',
          grade: Math.round(values.grade4),
          content: values.content4
        }, {
          name: '机制建设',
          grade: Math.round(values.grade5),
          content: values.content5
        }, {
          name: '综合评价',
          grade: Math.round(values.grade6),
          content: values.content6
        }]
      };
      onSubmit ? onSubmit(data) : '';
    });
  }
  //更新评价
  function handleChange() {
    changeEvaluate ? changeEvaluate('1') : '';
  }

  const con = <Card>
    <Form>
      <h4>1、建设目标</h4>
      <Form.Item label="评价得分" {...formItemLayout}>
        {getFieldDecorator('grade0', {
          initialValue: '',
          rules: [{ required: true, message: '请输入0-100的整数!', whitespace: true }],
        })(
          <Input type="number" placeholder="请输入0-100的整数" maxLength={3} />
        )}
      </Form.Item>
      <Form.Item label="试点评价" {...formItemLayout}>
        {getFieldDecorator('content0', {
          initialValue: '',
          rules: [{ required: true, message: '请输入评价内容!', whitespace: true }],
        })(
          <TextArea rows={4} placeholder="请输入评价内容" maxLength={500} />
        )}
      </Form.Item>
      <h4>2、组织架构</h4>
      <Form.Item label="评价得分" {...formItemLayout}>
        {getFieldDecorator('grade1', {
          initialValue: '',
          rules: [{ required: true, message: '请输入0-100的整数!', whitespace: true }],
        })(
          <Input type="number" placeholder="请输入0-100的整数" maxLength={3} />
        )}
      </Form.Item>
      <Form.Item label="试点评价" {...formItemLayout}>
        {getFieldDecorator('content1', {
          initialValue: '',
          rules: [{ required: true, message: '请输入评价内容!', whitespace: true }],
        })(
          <TextArea rows={4} placeholder="请输入评价内容" maxLength={500} />
        )}
      </Form.Item>
      <h4>3、活动内容</h4>
      <Form.Item label="评价得分" {...formItemLayout}>
        {getFieldDecorator('grade2', {
          initialValue: '',
          rules: [{ required: true, message: '请输入0-100的整数!', whitespace: true }],
        })(
          <Input type="number" placeholder="请输入0-100的整数" maxLength={3} />
        )}
      </Form.Item>
      <Form.Item label="试点评价" {...formItemLayout}>
        {getFieldDecorator('content2', {
          initialValue: '',
          rules: [{ required: true, message: '请输入评价内容!', whitespace: true }],
        })(
          <TextArea rows={4} placeholder="请输入评价内容" maxLength={500} />
        )}
      </Form.Item>
      <h4>4、阵地整合</h4>
      <Form.Item label="评价得分" {...formItemLayout}>
        {getFieldDecorator('grade3', {
          initialValue: '',
          rules: [{ required: true, message: '请输入0-100的整数!', whitespace: true }],
        })(
          <Input type="number" placeholder="请输入0-100的整数" maxLength={3} />
        )}
      </Form.Item>
      <Form.Item label="试点评价" {...formItemLayout}>
        {getFieldDecorator('content3', {
          initialValue: '',
          rules: [{ required: true, message: '请输入评价内容!', whitespace: true }],
        })(
          <TextArea rows={4} placeholder="请输入评价内容" maxLength={500} />
        )}
      </Form.Item>
      <h4>5、队伍建设</h4>
      <Form.Item label="评价得分" {...formItemLayout}>
        {getFieldDecorator('grade4', {
          initialValue: '',
          rules: [{ required: true, message: '请输入0-100的整数!', whitespace: true }],
        })(
          <Input type="number" placeholder="请输入0-100的整数" maxLength={3} />
        )}
      </Form.Item>
      <Form.Item label="试点评价" {...formItemLayout}>
        {getFieldDecorator('content4', {
          initialValue: '',
          rules: [{ required: true, message: '请输入评价内容!', whitespace: true }],
        })(
          <TextArea rows={4} placeholder="请输入评价内容" maxLength={500} />
        )}
      </Form.Item>
      <h4>6、机制建设</h4>
      <Form.Item label="评价得分" {...formItemLayout}>
        {getFieldDecorator('grade5', {
          initialValue: '',
          rules: [{ required: true, message: '请输入0-100的整数!', whitespace: true }],
        })(
          <Input type="number" placeholder="请输入0-100的整数" maxLength={3} />
        )}
      </Form.Item>
      <Form.Item label="试点评价" {...formItemLayout}>
        {getFieldDecorator('content5', {
          initialValue: '',
          rules: [{ required: true, message: '请输入评价内容!', whitespace: true }],
        })(
          <TextArea rows={4} placeholder="请输入评价内容" maxLength={500} />
        )}
      </Form.Item>
      <h4>7、综合评分</h4>
      <Form.Item label="评价得分" {...formItemLayout}>
        {getFieldDecorator('grade6', {
          initialValue: '',
          rules: [{ required: true, message: '请输入0-100的整数!', whitespace: true }],
        })(
          <Input type="number" placeholder="请输入0-100的整数" maxLength={3} />
        )}
      </Form.Item>
      <Form.Item label="试点评价" {...formItemLayout}>
        {getFieldDecorator('content6', {
          initialValue: '',
          rules: [{ required: true, message: '请输入评价内容!', whitespace: true }],
        })(
          <TextArea rows={4} placeholder="请输入评价内容" maxLength={500} />
        )}
      </Form.Item>

      <Form.Item wrapperCol={{ span: 8, offset: 3 }}>
        {!edit && <Button type="primary" onClick={handleSubmit.bind(this, memberType, id)} loading={loading}>完成并提交</Button>}
      </Form.Item>
    </Form>
    {edit && <Button type="primary" style={{ position: 'absolute', right: '20px', top: '40px' }} onClick={handleChange}>更新评价</Button>}
  </Card>
  const con1 = <div>
    <h4>1、建设目标</h4>
    <Form.Item label="评价得分" {...formItemLayout}>
      {getFieldDecorator('grade0', {
        initialValue: '',
        rules: [{ required: true, message: '请输入0-100的整数!', whitespace: true }],
      })(
        <Input type="number" placeholder="请输入0-100的整数" maxLength={3} />
      )}
    </Form.Item>
    <Form.Item label="试点评价" {...formItemLayout}>
      {getFieldDecorator('content0', {
        initialValue: '',
        rules: [{ required: true, message: '请输入评价内容!', whitespace: true }],
      })(
        <TextArea rows={4} placeholder="请输入评价内容" maxLength={500} />
      )}
    </Form.Item>
    <h4>2、组织架构</h4>
    <Form.Item label="评价得分" {...formItemLayout}>
      {getFieldDecorator('grade1', {
        initialValue: '',
        rules: [{ required: true, message: '请输入0-100的整数!', whitespace: true }],
      })(
        <Input type="number" placeholder="请输入0-100的整数" maxLength={3} />
      )}
    </Form.Item>
    <Form.Item label="试点评价" {...formItemLayout}>
      {getFieldDecorator('content1', {
        initialValue: '',
        rules: [{ required: true, message: '请输入评价内容!', whitespace: true }],
      })(
        <TextArea rows={4} placeholder="请输入评价内容" maxLength={500} />
      )}
    </Form.Item>
    <h4>3、活动内容</h4>
    <Form.Item label="评价得分" {...formItemLayout}>
      {getFieldDecorator('grade2', {
        initialValue: '',
        rules: [{ required: true, message: '请输入0-100的整数!', whitespace: true }],
      })(
        <Input type="number" placeholder="请输入0-100的整数" maxLength={3} />
      )}
    </Form.Item>
    <Form.Item label="试点评价" {...formItemLayout}>
      {getFieldDecorator('content2', {
        initialValue: '',
        rules: [{ required: true, message: '请输入评价内容!', whitespace: true }],
      })(
        <TextArea rows={4} placeholder="请输入评价内容" maxLength={500} />
      )}
    </Form.Item>
    <h4>4、阵地整合</h4>
    <Form.Item label="评价得分" {...formItemLayout}>
      {getFieldDecorator('grade3', {
        initialValue: '',
        rules: [{ required: true, message: '请输入0-100的整数!', whitespace: true }],
      })(
        <Input type="number" placeholder="请输入0-100的整数" maxLength={3} />
      )}
    </Form.Item>
    <Form.Item label="试点评价" {...formItemLayout}>
      {getFieldDecorator('content3', {
        initialValue: '',
        rules: [{ required: true, message: '请输入评价内容!', whitespace: true }],
      })(
        <TextArea rows={4} placeholder="请输入评价内容" maxLength={500} />
      )}
    </Form.Item>
    <h4>5、队伍建设</h4>
    <Form.Item label="评价得分" {...formItemLayout}>
      {getFieldDecorator('grade4', {
        initialValue: '',
        rules: [{ required: true, message: '请输入0-100的整数!', whitespace: true }],
      })(
        <Input type="number" placeholder="请输入0-100的整数" maxLength={3} />
      )}
    </Form.Item>
    <Form.Item label="试点评价" {...formItemLayout}>
      {getFieldDecorator('content4', {
        initialValue: '',
        rules: [{ required: true, message: '请输入评价内容!', whitespace: true }],
      })(
        <TextArea rows={4} placeholder="请输入评价内容" maxLength={500} />
      )}
    </Form.Item>
    <h4>6、机制建设</h4>
    <Form.Item label="评价得分" {...formItemLayout}>
      {getFieldDecorator('grade5', {
        initialValue: '',
        rules: [{ required: true, message: '请输入0-100的整数!', whitespace: true }],
      })(
        <Input type="number" placeholder="请输入0-100的整数" maxLength={3} />
      )}
    </Form.Item>
    <Form.Item label="试点评价" {...formItemLayout}>
      {getFieldDecorator('content5', {
        initialValue: '',
        rules: [{ required: true, message: '请输入评价内容!', whitespace: true }],
      })(
        <TextArea rows={4} placeholder="请输入评价内容" maxLength={500} />
      )}
    </Form.Item>
    <h4>7、综合评分</h4>
    <Form.Item label="评价得分" {...formItemLayout}>
      {getFieldDecorator('grade6', {
        initialValue: '',
        rules: [{ required: true, message: '请输入0-100的整数!', whitespace: true }],
      })(
        <Input type="number" placeholder="请输入0-100的整数" maxLength={3} />
      )}
    </Form.Item>
    <Form.Item label="试点评价" {...formItemLayout}>
      {getFieldDecorator('content6', {
        initialValue: '',
        rules: [{ required: true, message: '请输入评价内容!', whitespace: true }],
      })(
        <TextArea rows={4} placeholder="请输入评价内容" maxLength={500} />
      )}
    </Form.Item>
  </div>
  let oneType = evaluateList && evaluateList.length == 1 && evaluateList[0].type;
  let oneCon = oneType && evaluateList[0].evaluaContent.map((item, index) => {
    return (
      <div key={index}>
        <h4>{index + 1}、{item.name}</h4>
        <Form.Item label="评价得分" {...formItemLayout} style={{ marginBottom: !edit ? '0' : '24px' }}>
          {getFieldDecorator(`grade${index}`, {
            initialValue: item.grade ? item.grade.toString() : '',
            // rules: [{ required: true, pattern: new RegExp(/^[1-9]\d*$/, "g"), message: '请输入0-100的整数!', whitespace: true }],
            rules: [{ required: true, message: '请输入分数!' }, { pattern: /^([1-9]\d*|[0]{1,1})$/, message: '请输入0-100的正整数!' }],
          })(
            edit ? <InputNumber min={0} max={100} placeholder="请输入分数" /> : <p>{item.grade}</p>
          )}
        </Form.Item>
        <Form.Item label="试点评价" {...formItemLayout}>
          {getFieldDecorator(`content${index}`, {
            initialValue: item.content,
            rules: [{ required: true, message: '请输入评价内容!', whitespace: true }],
          })(
            edit ? <TextArea rows={4} placeholder="请输入评价内容" maxLength={500} /> : <p className="pingjia-item-content">{item.content}</p>
          )}
        </Form.Item>
      </div>
    )
  })
  let twoType1 = evaluateList && evaluateList.length == 2 && evaluateList[0].type;
  let twoType2 = evaluateList && evaluateList.length == 2 && evaluateList[1].type;
  let twoCon1 = twoType1 && twoType1 == memberType ? evaluateList[0].evaluaContent.map((item, index) => {
    return (
      <div key={index}>
        <h4>{index + 1}、{item.name}</h4>
        <Form.Item label="评价得分" {...formItemLayout} style={{ marginBottom: !edit ? '0' : '24px' }}>
          {getFieldDecorator(`grade${index}`, {
            initialValue: item.grade ? item.grade.toString() : '',
            // rules: [{ required: true, pattern: new RegExp(/^[1-9]\d*$/, "g"), message: '请输入0-100的整数!', whitespace: true }],
            rules: [{ required: true, message: '请输入分数!' }, { pattern: /^([1-9]\d*|[0]{1,1})$/, message: '请输入0-100的正整数!' }],
          })(
            edit ? <InputNumber min={0} max={100} placeholder="请输入分数" /> : <p>{item.grade}</p>
          )}
        </Form.Item>
        <Form.Item label="试点评价" {...formItemLayout}>
          {getFieldDecorator(`content${index}`, {
            initialValue: item.content,
            rules: [{ required: true, message: '请输入评价内容!', whitespace: true }],
          })(
            edit ? <TextArea rows={4} placeholder="请输入评价内容" maxLength={500} /> : <p className="pingjia-item-content">{item.content}</p>
          )}
        </Form.Item>
      </div>
    )
  }) : twoType1 && twoType1 != memberType && evaluateList[0].evaluaContent.map((item, index) => {
    return (
      <div key={index}>
        <h4>{index + 1}、{item.name}</h4>
        <div className="evaluaText ant-row"><span className="ant-col-3">评价得分:</span><span className="ant-col-8">{item.grade}</span></div>
        <div className="evaluaText2 ant-row"><span className="ant-col-3">试点评价:</span><span className="ant-col-8 pingjia-item-content">{item.content}</span></div>
      </div>
    )
  })
  let twoCon2 = twoType2 && twoType2 == memberType ? evaluateList[1].evaluaContent.map((item, index) => {
    return (
      <div key={index}>
        <h4>{index + 1}、{item.name}</h4>
        <Form.Item label="评价得分" {...formItemLayout} style={{ marginBottom: !edit ? '0' : '24px' }}>
          {getFieldDecorator(`grade${index}`, {
            initialValue: item.grade ? item.grade.toString() : '',
            // rules: [{ required: true, pattern: new RegExp(/^[1-9]\d*$/, "g"), message: '请输入0-100的整数!', whitespace: true }],
            rules: [{ required: true, message: '请输入分数!' }, { pattern: /^([1-9]\d*|[0]{1,1})$/, message: '请输入0-100的正整数!' }],
          })(
            edit ? <InputNumber min={0} max={100} placeholder="请输入分数" /> : <p>{item.grade}</p>
          )}
        </Form.Item>
        <Form.Item label="试点评价" {...formItemLayout}>
          {getFieldDecorator(`content${index}`, {
            initialValue: item.content,
            rules: [{ required: true, message: '请输入评价内容!', whitespace: true }],
          })(
            edit ? <TextArea rows={4} placeholder="请输入评价内容" maxLength={500} /> : <p className="pingjia-item-content">{item.content}</p>
          )}
        </Form.Item>
      </div>
    )
  }) : twoType2 && twoType2 != memberType && evaluateList[1].evaluaContent.map((item, index) => {
    return (
      <div key={index}>
        <h4>{index + 1}、{item.name}</h4>
        <div className="evaluaText ant-row"><span className="ant-col-3">评价得分:</span><span className="ant-col-8">{item.grade}</span></div>
        <div className="evaluaText2 ant-row"><span className="ant-col-3">试点评价:</span><span className="ant-col-8 pingjia-item-content">{item.content}</span></div>
      </div>
    )
  })
  //tab
  function evaliateTab(e) {
    evaluateTab ? evaluateTab(e) : '';
    changeEvaluate('2')
    props.form.resetFields();
  }
  return (
    <div style={{ marginBottom: '20px' }}>

      {status == 5 && evaluateList && evaluateList.length == 3 &&
        <Tabs activeKey={activeEvaluateTab} onChange={evaliateTab} style={{ background: '#fff', marginTop: '20px' }}>
          {
            evaluateList.map((values, i) => {
              return (
                <TabPane tab={values.type == 1 ? '试点自评' : values.type == 2 ? '市级评价' : '省级评价'} key={'a' + values.type}>
                  <Card>
                    <Form>
                      {
                        values.evaluaContent && values.evaluaContent.map((item, index) => {
                          return (
                            <div key={index}>
                              <h4>{index + 1}、{item.name}</h4>
                              {values.type == memberType ? <Form.Item label="评价得分" {...formItemLayout} style={{ marginBottom: !edit ? '0' : '24px' }}>
                                {getFieldDecorator(`grade${index}`, {
                                  initialValue: item.grade ? item.grade.toString() : '',
                                  rules: [{ required: true, message: '请输入分数!' }, { pattern: /^([1-9]\d*|[0]{1,1})$/, message: '请输入0-100的正整数!' }],
                                  // rules: [{ required: true, pattern: new RegExp(/^[1-9]\d*$/, "g"), message: '请输入0-100的整数!', whitespace: true }],
                                })(
                                  edit ? <InputNumber min={0} max={100} placeholder="请输入分数" /> : <p>{item.grade}</p>
                                )}
                              </Form.Item> : <div className="evaluaText ant-row"><span className="ant-col-3">评价得分:</span><span className="ant-col-8">{item.grade}</span></div>
                              }
                              {values.type == memberType ? <Form.Item label="试点评价" {...formItemLayout}>
                                {getFieldDecorator(`content${index}`, {
                                  initialValue: item.content,
                                  rules: [{ required: true, message: '请输入评价内容!', whitespace: true }],
                                })(
                                  edit && (values.type == memberType) ? <TextArea rows={4} placeholder="请输入评价内容" maxLength={500} /> : <p className="pingjia-item-content">{item.content}</p>
                                )}
                              </Form.Item> : <div className="evaluaText2 ant-row"><span className="ant-col-3">试点评价:</span><span className="ant-col-8 pingjia-item-content">{item.content}</span></div>

                              }
                            </div>
                          )
                        })
                      }
                      <Form.Item wrapperCol={{ span: 8, offset: 3 }}>
                        {edit && (values.type == memberType) && <Button type="primary" onClick={handleSubmit.bind(this, values.type, values.declaresId)} loading={loading}>完成并提交</Button>}
                      </Form.Item>
                      {!edit && (values.type == memberType) && <Button type="primary" style={{ position: 'absolute', right: '20px', top: '40px' }} onClick={handleChange}>更新评价</Button>}
                    </Form>
                  </Card>
                </TabPane>
              )
            })
          }
        </Tabs>
      }

      {status == 5 && (!evaluateList || evaluateList.length == 0) &&
        <Tabs activeKey={activeEvaluateTab} onChange={evaliateTab} style={{ background: '#fff', marginTop: '20px' }}>
          {!evaluateList || evaluateList.length == 0 && <TabPane tab='试点自评' key="a1">
            {memberType == 1 ? con : <p style={{ padding: '5%' }}>暂无试点评价</p>}
          </TabPane>
          }
          {!evaluateList || evaluateList.length == 0 && <TabPane tab='市级评价' key="a2">
            {memberType == 2 ? con : <p style={{ padding: '5%' }}>暂无市级评价</p>}
          </TabPane>
          }
          {!evaluateList || evaluateList.length == 0 && <TabPane tab='省级评价' key="a3">
            {memberType == 3 ? con : <p style={{ padding: '5%' }}>暂无省级评价</p>}
          </TabPane>
          }
        </Tabs>
      }

      {status == 5 && evaluateList && evaluateList.length == 1 &&
        <Tabs activeKey={activeEvaluateTab} onChange={evaliateTab} style={{ background: '#fff', marginTop: '20px' }}>
          <TabPane tab='试点自评' key="a1">
            {oneType == 1 || memberType == 1 ?
              <Card>
                <Form>
                  {
                    oneType == 1 ? oneCon : con1
                  }
                  {!edit && memberType == 1 && oneType == 1 ? <Button type="primary" style={{ position: 'absolute', right: '20px', top: '40px' }} onClick={handleChange}>更新评价</Button> :
                    memberType == 1 && <Form.Item wrapperCol={{ span: 8, offset: 3 }}>
                      <Button type="primary" onClick={handleSubmit.bind(this, '1', id)} loading={loading}>完成并提交</Button>
                    </Form.Item>}
                </Form>
              </Card>
              : <p style={{ padding: '5%' }}>暂无试点评价</p>
            }
          </TabPane>
          <TabPane tab='市级评价' key="a2">
            {oneType == 2 || memberType == 2 ?
              <Card>
                <Form>
                  {
                    oneType == 2 ? oneCon : con1
                  }
                  {!edit && memberType == 2 && oneType == 2 ? <Button type="primary" style={{ position: 'absolute', right: '20px', top: '40px' }} onClick={handleChange}>更新评价</Button> :
                    memberType == 2 && <Form.Item wrapperCol={{ span: 8, offset: 3 }}>
                      <Button type="primary" onClick={handleSubmit.bind(this, '2', id)} loading={loading}>完成并提交</Button>
                    </Form.Item>}
                </Form>
              </Card>
              : <p style={{ padding: '5%' }}>暂无市级评价</p>
            }
          </TabPane>
          <TabPane tab='省级评价' key="a3">
            {oneType == 3 || memberType == 3 ?
              <Card>
                <Form>
                  {
                    oneType == 3 ? oneCon : con1
                  }
                  {!edit && memberType == 3 && oneType == 3 ? <Button type="primary" style={{ position: 'absolute', right: '20px', top: '40px' }} onClick={handleChange}>更新评价</Button> :
                    memberType == 3 && <Form.Item wrapperCol={{ span: 8, offset: 3 }}>
                      <Button type="primary" onClick={handleSubmit.bind(this, '3', id)} loading={loading}>完成并提交</Button>
                    </Form.Item>}
                </Form>
              </Card>
              : <p style={{ padding: '5%' }}>暂无省级评价</p>
            }
          </TabPane>
        </Tabs>
      }

      {status == 5 && evaluateList && evaluateList.length == 2 &&
        <Tabs activeKey={activeEvaluateTab} onChange={evaliateTab} style={{ background: '#fff', marginTop: '20px' }}>
          <TabPane tab='试点自评' key="a1">
            {memberType != 1 && twoType1 != 1 && twoType2 != 1 ?
              <p style={{ padding: '5%' }}>暂无试点评价</p> :
              <Card>
                <Form>
                  {
                    memberType == 1 && twoType1 != 1 && twoType2 != 1 ? con1 :
                      twoType1 == 1 ? twoCon1 : twoCon2
                  }
                  {!edit && memberType == 1 && (twoType1 == 1 || twoType2 == 1) ? <Button type="primary" style={{ position: 'absolute', right: '20px', top: '40px' }} onClick={handleChange}>更新评价</Button> :
                    memberType == 1 && <Form.Item wrapperCol={{ span: 8, offset: 3 }}>
                      <Button type="primary" onClick={handleSubmit.bind(this, '1', id)} loading={loading}>完成并提交</Button>
                    </Form.Item>}
                </Form>
              </Card>
            }
          </TabPane>
          <TabPane tab='市级评价' key="a2">
            {memberType != 2 && twoType1 != 2 && twoType2 != 2 ?
              <p style={{ padding: '5%' }}>暂无市级评价</p> :
              <Card>
                <Form>
                  {
                    memberType == 2 && twoType1 != 2 && twoType2 != 2 ? con1 :
                      twoType1 == 2 ? twoCon1 : twoCon2
                  }
                  {!edit && memberType == 2 && (twoType1 == 2 || twoType2 == 2) ? <Button type="primary" style={{ position: 'absolute', right: '20px', top: '40px' }} onClick={handleChange}>更新评价</Button> :
                    memberType == 2 && <Form.Item wrapperCol={{ span: 8, offset: 3 }}>
                      <Button type="primary" onClick={handleSubmit.bind(this, '2', id)} loading={loading}>完成并提交</Button>
                    </Form.Item>}
                </Form>
              </Card>
            }
          </TabPane>
          <TabPane tab='省级评价' key="a3">
            {memberType != 3 && twoType1 != 3 && twoType2 != 3 ?
              <p style={{ padding: '5%' }}>暂无省级评价</p> :
              <Card>
                <Form>
                  {
                    memberType == 3 && twoType1 != 3 && twoType2 != 3 ? con1 :
                      twoType1 == 3 ? twoCon1 : twoCon2
                  }
                  {!edit && memberType == 3 && (twoType1 == 3 || twoType2 == 3) ? <Button type="primary" style={{ position: 'absolute', right: '20px', top: '40px' }} onClick={handleChange}>更新评价</Button> :
                    memberType == 3 && <Form.Item wrapperCol={{ span: 8, offset: 3 }}>
                      <Button type="primary" onClick={handleSubmit.bind(this, '3', id)} loading={loading}>完成并提交</Button>
                    </Form.Item>}
                </Form>
              </Card>
            }
          </TabPane>
        </Tabs>
      }

      {status != 5 && <Tabs activeKey={activeEvaluateTab} onChange={evaliateTab} style={{ background: '#fff', marginTop: '20px' }}>
        <TabPane tab={'试点自评'} key={'a1'}><p style={{ padding: '5%', color: '#000', fontSize: '18px', fontWeight: 'bold' }}>试点建设评价（省级审核通过后解锁）</p></TabPane>
        <TabPane tab={'市级评价'} key={'a2'}><p style={{ padding: '5%', color: '#000', fontSize: '18px', fontWeight: 'bold' }}>试点建设评价（省级审核通过后解锁）</p></TabPane>
        <TabPane tab={'省级评价'} key={'a3'}><p style={{ padding: '5%', color: '#000', fontSize: '18px', fontWeight: 'bold' }}>试点建设评价（省级审核通过后解锁）</p></TabPane>
      </Tabs>}
    </div>
  )
}

export default Form.create()(Evaluate);