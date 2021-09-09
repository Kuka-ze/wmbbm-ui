import React from 'react';
import { connect } from 'dva';
import { Form, Card, Button, Select, Input, Radio, Checkbox, Row, Col, Cascader, Icon, InputNumber, Popconfirm, Modal } from 'antd';
import Breadcrumb from "../../components/Breadcrumb/index";
import Image from '../../components/Image/';
import { checkCard } from '../../utils/util';
import queryString from 'query-string';

function VolunteerAddEdit(props) {
    let {
        form,
        loading,
        dispatch,
        detail = {},
        enterpriseType = [],
        id,
        skillsType = [],
        sex,
        age,
        options = [],
        uuid,
        userList,
        mobileType,
        mobile,
        isInput,
        isSubmit,
        tagList = []
    } = props;
    const { getFieldDecorator, validateFields, getFieldValue } = form;
    const disabledCheck = queryString.parse(props.history.location.search).disabled
    const disabledId = queryString.parse(props.history.location.search).id
    const detailSkill = detail && detail.skills && detail.skills.map((item) => {
        return item.key
    })
    const detailSkillString = detail && detail.skills && detail.skills.map((item) => {
        return item.value
    })
    /** 面包屑 */
    const breadcrumbProps = {
        breadcrumbs: [{
            name: '志愿队伍管理',
        }, {
            name: '志愿者管理',
            href: 'volunteer'
        }, {
            name: props.id ? disabledCheck == 'true' ? '详情' : '编辑' : '新增',
        }]
    }
    /** 布局 */
    const formItemLayout = {
        labelCol: { span: 3 },
        wrapperCol: { span: 8 },
    }
    //提交
    function handleSubmit(e) {
        dispatch({
            type: 'VolunteerAddEditModel/concat',
            payload: {
                isSubmit: true,
            }
        });
        validateFields((err, values) => {
            if (err) {
                return;
            }
            //图片
            let portrait = [];
            let imgsLen = values.portrait && values.portrait.length;
            if (values.portrait !== undefined && imgsLen !== 0) {
                for (let i = 0; i < imgsLen; i++) {
                    if (values.portrait[i].response) {
                        portrait[i] = values.portrait[i].response.data.filepath
                    } else {
                        portrait[i] = values.portrait[i].url
                    }
                }
            }
            let teamArr = [];
            if (values.user && values.user.length > 0) {
                values.user.map((item1, index1) => {
                    let obj = {}
                    item1.map((item2, index2) => {
                        obj.centerId = values.user[index1][0];
                        obj.teamId = values.user[index1][1];
                    });
                    teamArr.push(obj);
                })
            }
            //标签
            let tagsArr = []
            if (tagList && tagList.length > 0) {
                tagList.map((item, index) => {
                    if (typeof (props.form.getFieldValue(`tags${item.key}`)) != 'undefined') {
                        let arrObj = {
                            tagType: item.key,
                            tagIds: props.form.getFieldValue(`tags${item.key}`) && typeof (props.form.getFieldValue(`tags${item.key}`)) == 'string' ? props.form.getFieldValue(`tags${item.key}`).split(',') : props.form.getFieldValue(`tags${item.key}`)
                        }
                        tagsArr.push(arrObj);
                    }
                })
            }
            let data = {
                ...values,
                portrait: portrait && portrait.length > 0 ? portrait.toString() : '',
                teams: teamArr,
                id: disabledId && disabledId,
                tags: tagsArr
            };
            delete data.task_image;
            delete data.keys;
            delete data.user;
            if (mobileType != 1) {
                delete data.portrait;
            }
            if (disabledId) {
                dispatch({
                    type: 'VolunteerAddEditModel/volunteerEdit',
                    payload: data
                });
            } else {
                dispatch({
                    type: 'VolunteerAddEditModel/volunteerAdd',
                    payload: data
                });
            }
        });
    }
    //返回上一页
    function handleBack(e) {
        history.go(-1);
    }
    //图片上传
    function handleImage(id, fileList) {
        form.setFieldsValue({ portrait: fileList })
        let img = fileList && fileList.length > 0 && fileList[0].response.data.filepath;
    }
    //点击放大图片
    function handlePreview(src) {
        props.dispatch({
            type: 'VolunteerAddEditModel/concat',
            payload: {
                previewVisible: true,
                previewImage: src
            }
        });
    }

    //隐藏放大的图片
    function handleImgCancel() {
        props.dispatch({
            type: 'VolunteerAddEditModel/concat',
            payload: {
                previewVisible: false,
                previewImage: ''
            }
        });
    }

    /** 动态增删表格 */
    const formItemLayout2 = {
        labelCol: {
            span: 5
        },
        wrapperCol: {
            span: 18
        },
    }
    const formItemLayoutWithOutLabel = {
        wrapperCol: { span: 18, offset: 5 },
    }

    function add(k) {
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(uuid);
        uuid++;
        dispatch({
            type: 'VolunteerAddEditModel/concat',
            payload: {
                uuid: uuid,
            }
        });
        form.setFieldsValue({
            keys: nextKeys,
        });
    }

    function remove(k) {
        const keys = form.getFieldValue('keys');
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    }
    //转换
    function lunh(id) {
        let user_name;
        options && options.length > 0 && options.map((v, i) => {
            if (v.teamId == id) {
                user_name = userList.centerName
            }
        })
        return user_name
    }
    // 手机校验的方法
    function validatePrimeNumber(mobile, mobileType) {
        let regex = /^1[0-9]{10}$/;
        if (mobileType == 0 && isInput) {
            return {
                validateStatus: 'error',
                errorMsg: '请输入正确的手机号码'
            };
        }

        if (mobileType == 1) {
            return {
                validateStatus: 'success',
                errorMsg: <div style={{ color: '#33cc00' }}> 当前志愿者未注册， 完善信息完成注册；</div>,
            };
        }
        if (mobileType == 3) {
            return {
                validateStatus: 'success',
                errorMsg: <div style={{ color: '#0099cc' }}> 该志愿者已注册， 请关联本平台队伍； </div>,
            };
        }
        if (isSubmit) {
            return {
                validateStatus: 'error',
                errorMsg: '请输入手机号码'
            };
        }
    }

    function handleNumberChange(value) {
        let regex = /^1[0-9]{10}$/;
        if (!regex.test(value.target.value)) {
            dispatch({
                type: 'VolunteerAddEditModel/concat',
                payload: {
                    mobileType: 0,
                    isInput: true,

                }
            });
        }
        if (regex.test(value.target.value)) {
            dispatch({
                type: 'VolunteerAddEditModel/volunteerMobile',
                payload: {
                    mobile: value.target.value,
                },
                callback: (payload, ) => {
                    form.setFieldsValue({ keys: payload && payload.length > 0 ? payload.map((item, index) => index) : [0] })
                }
            });
        }
    };
    getFieldDecorator('keys', { initialValue: userList && userList.length > 0 ? userList.map((item, index) => index) : [0] });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => {
        return (<div key={index}>
            <Row gutter={10} style={{ paddingLeft: '0.4%' }}>
                <Col span={14} >
                    <Row gutter={16} >
                        <Col span={24} >
                            <Form.Item label="所属队伍" {...formItemLayout2} > {
                                getFieldDecorator(`user[${k}]`, {
                                    // initialValue:teamArr,
                                    initialValue: userList && userList.length > 0 && k < userList.length && userList[k].centerName != null && [+userList[k].centerId, +userList[k].teamId] || undefined,
                                    rules: [{ required: true, message: "请选择所属队伍!" }]
                                })(<Cascader options={options}
                                    placeholder="请选择所属队伍"
                                    showSearch={
                                        { filter }
                                    }
                                    disabled={userList && userList.length > 0 && k < userList.length ? userList[k].disabled == true ? true : false : false}
                                />
                                )
                            } </Form.Item>
                        </Col>
                    </Row>
                </Col>
                {
                    disabledId ?
                        <Col span={6} > {
                            keys.length > 0 ? (
                                <Button type="dashed" onClick={() => remove(k)}
                                    style={{ marginTop: '4px' }}
                                    disabled={userList && userList.length > 0 && k < userList.length ? userList[k].disabled == true ? true : false : false} > <Icon type="minus" /> 删除队伍 </Button>
                            ) : null
                        }
                        </Col>
                        :
                        <Col span={6} >
                            {keys.length > 1 ?
                                (<Button type="dashed"
                                    onClick={() => remove(k)}
                                    style={{ marginTop: '4px' }}
                                    disabled={userList && userList.length > 0 && k < userList.length ? userList[k].disabled == true ? true : false : false} > <Icon type="minus" />
                                 删除队伍
                                </Button>)
                                :
                                null
                            }
                        </Col>

                }

            </Row>
        </div>
        );
    });

    function filter(inputValue, path) {
        return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
    }
    /** 动态增删表格 end */
    let { selectTagIds = [] } = detail;
    return (
        <div>
            <Breadcrumb {...breadcrumbProps} />
            <Card>
                <Form>
                    { /* 手机号码再次校验 */}
                    {disabledCheck == 'true' ?
                        <Form.Item label="手机号码" {...formItemLayout} >
                            <span> {detail.mobile} </span>
                        </Form.Item> :
                        <div>
                            <Form.Item {...formItemLayout}
                                label="手机号码"
                                // validateStatus={number.validateStatus}
                                validateStatus={disabledId ? null : validatePrimeNumber(mobile, mobileType) && validatePrimeNumber(mobile, mobileType).validateStatus}
                                help={disabledId ? null : validatePrimeNumber(mobile, mobileType) && validatePrimeNumber(mobile, mobileType).errorMsg || null} > {
                                    getFieldDecorator('mobile', {
                                        initialValue: detail.mobile,
                                        rules: [{ required: true, message: '请输入手机号码!' },],
                                    })(<Input type="text"
                                        placeholder="请输入手机号码"
                                        disabled={disabledId ? true : false}
                                        onChange={handleNumberChange}
                                    />
                                    )
                                }
                            </Form.Item>

                        </div>
                    }
                    {
                        disabledCheck == 'true' ?
                            <Form.Item label="志愿者头像" {...formItemLayout} >
                                {detail.portrait && detail.portrait.length > 0 && detail.portrait[0].url != 'false' ?
                                    detail.portrait.map((item, index) => {
                                        return <img src={item.url} key={index} style={{ width: '100px', height: '100px', cursor: 'pointer' }} onClick={handlePreview.bind(this, item.url)} />
                                    }) : ''}
                            </Form.Item>
                            :
                            <div>
                                {
                                    mobileType == 1 || disabledId ?
                                        <Form.Item label="志愿者头像" {...formItemLayout} > {
                                            getFieldDecorator('portrait', {
                                                initialValue: detail.portrait,
                                                rules: [{ required: false, message: '请上传志愿者头像!' }],
                                            })(
                                                disabledId ? <div>{detail.portrait && detail.portrait.length > 0 && detail.portrait[0].url != 'false' ?
                                                    detail.portrait.map((item, index) => {
                                                        return <img src={item.url} key={index} style={{ width: '100px', height: '100px', cursor: 'pointer' }} onClick={handlePreview.bind(this, item.url)} />
                                                    }) : ''}</div> : <Image file={detail.portrait ? detail.portrait : []}
                                                        handleImage={handleImage.bind(this)}
                                                        size={1}
                                                        disabled={disabledId ? true : false} />
                                            )
                                        }
                                        </Form.Item>
                                        :
                                        null
                                }
                            </div>
                    } {
                        disabledCheck == 'true' ?
                            <Form.Item label="志愿者姓名" {...formItemLayout} >
                                <span> {detail.volunteerName} </span>
                            </Form.Item> :
                            <div>
                                {
                                    mobileType == 1 || disabledId ?
                                        <Form.Item label="志愿者姓名" {...formItemLayout} > {
                                            getFieldDecorator('volunteerName', {
                                                initialValue: detail.volunteerName,
                                                rules: [{ required: true, message: '请输入志愿者姓名!', whitespace: true }],
                                            })(<Input type="text"
                                                placeholder="请输入志愿者姓名"
                                                maxLength={10}
                                                disabled={disabledId ? true : false} />
                                            )
                                        }
                                        </Form.Item>
                                        :
                                        null

                                }
                            </div>


                    }
                    <div>
                        {disabledCheck == 'true' ?
                            <Form.Item label="身份证号码" {...formItemLayout} >
                                <span> {detail.idCard} </span>
                            </Form.Item> :
                            <div>
                            { mobileType == 1 || disabledId ? <Form.Item label="身份证号码" {...formItemLayout} > {
                                getFieldDecorator('idCard', {
                                    initialValue: detail.idCard,
                                    rules: [{ required: true, message: '请输入身份证号码!', whitespace: true },
                                    { validator: checkCard.bind(this) }],
                                })(<Input type="text"
                                    placeholder="请输入身份证号码" />
                                )
                            }
                            </Form.Item> : ''}
                            </div>
                        }
                    </div>
                    {
                        /*           {
                                    disabledCheck == 'true' ?
                                      <Form.Item label="手机号码" {...formItemLayout}>
                                        <span>{detail.mobile}</span>
                                      </Form.Item>
                                      :
                                      <Form.Item label="手机号码" {...formItemLayout}>
                                        {getFieldDecorator('mobile', {
                                          initialValue: detail.mobile,
                                          rules: [{ required: true, message: '请输入手机号码!' }, 
                                          { validator: checkPhone.bind(this) }
                                          // { validator: checkMobile }
                                        ],
                                        })(
                                          <Input type="text" placeholder="请输入手机号码" disabled={disabledId ? true : false} onChange={changeMobile} />
                                        )}
                                      </Form.Item>
                                  } */
                    } {
                        disabledCheck == 'true' ?
                            <Form.Item label="性别" {...formItemLayout} >
                                <span> {detail.sex == 1 ? '男' : '女'} </span>
                            </Form.Item > :
                            <div>
                                {
                                    mobileType == 1 || disabledId ?
                                        <Form.Item label="性别" {...formItemLayout} >
                                            {
                                                getFieldDecorator(`sex`, {
                                                    initialValue: sex ? sex : detail.sex,
                                                    rules: [{ required: true, message: '请选择性别!' }]
                                                })(
                                                    <Radio.Group disabled={disabledId ? true : false} >
                                                        <Radio value="1"> 男 </Radio>
                                                        <Radio value="2" > 女 </Radio>
                                                    </Radio.Group >
                                                )
                                            }
                                        </Form.Item>
                                        :
                                        null
                                }
                            </div>

                    } {
                        disabledCheck == 'true' ?
                            <Form.Item label="擅长技能" {...formItemLayout} >
                                <span> {detailSkillString && detailSkillString.join()} </span>
                            </Form.Item > :
                            <div> {
                                mobileType == 1 || disabledId ?
                                    <Form.Item label="擅长技能" {...formItemLayout} > {
                                        getFieldDecorator(`skills`, {
                                            initialValue: detailSkill,
                                            rules: []
                                        })(
                                            <Checkbox.Group style={{ width: "100%" }}
                                                disabled={disabledId ? true : false} >
                                                <Row>{
                                                    skillsType && skillsType.length > 0 ?
                                                        skillsType.map((item, index) => {
                                                            return <Col span={8} key={index} style={{ padding: '10px 0 6px' }}>
                                                                <Checkbox value={item.id} > {item.name} </Checkbox>
                                                            </Col>
                                                        }) : ''
                                                }
                                                </Row>

                                            </Checkbox.Group>
                                        )
                                    }
                                    </Form.Item> :
                                    null

                            }
                            </div>

                    }
                    {
                        disabledCheck == 'true' ?
                            <div>
                                {
                                    detail.selectTags && detail.selectTags.length > 0 ? detail.selectTags.map((item, index) => {
                                        return <Form.Item label={item.name} {...formItemLayout} key={index}>
                                            <span>{item.tags && item.tags.length > 0 ? (item.tags.map((item2, index2) => item2.name)).join() : ''}</span>
                                        </Form.Item >
                                    }) : ''
                                }
                            </div>
                            :
                            <div> {
                                mobileType == 1 || disabledId ?
                                    tagList && tagList.length > 0 ? tagList.map((item, index) => {
                                        return <Form.Item label={item.value} {...formItemLayout} key={index}>
                                            {getFieldDecorator(`tags${item.key}`, {
                                                initialValue: selectTagIds && selectTagIds.length > 0 ? selectTagIds[index] == "undefined" ? undefined : selectTagIds[index] : undefined,
                                                rules: [{ required: false, message: `请选择${item.value}!` }],
                                            })(
                                                item.type == 1 ? <Radio.Group style={{ width: "100%" }}>
                                                    <Row>{item.tags && item.tags.length > 0 ? item.tags.map((item2, index2) => {
                                                        return <Col span={8} key={index2}><Radio value={item2.key} key={index2} style={{ padding: '10px 0 6px' }}>{item2.value}</Radio></Col>
                                                    }) : ''}</Row></Radio.Group> : item.type == 2 ?
                                                        <Checkbox.Group style={{ width: "100%" }}>
                                                            <Row>{
                                                                item.tags && item.tags.length > 0 ? item.tags.map((item2, index2) => {
                                                                    return <Col span={8} key={index2} style={{ padding: '10px 0 6px' }}>
                                                                        <Checkbox value={item2.key} >{item2.value}</Checkbox>
                                                                    </Col>
                                                                }) : ''
                                                            }
                                                            </Row>
                                                        </Checkbox.Group>
                                                        : ''
                                            )
                                            }
                                        </Form.Item>
                                    }) : '' :
                                    null
                            }
                            </div>
                    }
                    {/* {
                        disabledCheck == 'true' ?
                            <div>
                                {
                                    detail.selectTags && detail.selectTags.length > 0 ? detail.selectTags.map((item, index) => {
                                        return <Form.Item label={item.name} {...formItemLayout} key={index}>
                                            <span>{item.tags && item.tags.length > 0 ? item.tags.map((item2, index2) => item2.name.toString()) : ''}</span>
                                        </Form.Item >
                                    }) : ''
                                }
                            </div>
                            :
                            <div> {
                                mobileType == 1 || disabledId ?
                                    tagList && tagList.length > 0 ? tagList.map((item, index) => {
                                        return <span key={index}>
                                            {item.type == 1 ?
                                                <Form.Item label={item.value} {...formItemLayout} key={index}>
                                                    {getFieldDecorator(`tags${item.key}`, {
                                                        initialValue: selectTagIds && selectTagIds.length > 0 ? selectTagIds[index] : undefined,
                                                        rules: [{ required: false, message: `请选择${item.value}!` }],
                                                    })(
                                                        <Radio.Group>
                                                            {item.tags && item.tags.length > 0 ? item.tags.map((item2, index2) => {
                                                                return <Radio value={item2.key} key={index2} style={{ padding: '10px 0 6px' }}>{item2.value}</Radio>
                                                            }) : ''}</Radio.Group>
                                                    )
                                                    }
                                                </Form.Item> :
                                                item.type == 2 ?
                                                    <Form.Item label={item.value} {...formItemLayout} key={index}>
                                                        {getFieldDecorator(`tags${item.key}`, {
                                                            initialValue: selectTagIds && selectTagIds.length > 0 ? selectTagIds[index] : undefined,
                                                            rules: [{ required: false, message: `请选择${item.value}!` }],
                                                        })(
                                                            <Checkbox.Group style={{ width: "100%" }}>
                                                                <Row>{
                                                                    item.tags && item.tags.length > 0 ? item.tags.map((item2, index2) => {
                                                                        return <Col span={8} key={index2} style={{ padding: '10px 0 6px' }}>
                                                                            <Checkbox value={item2.key} > {item2.value} </Checkbox>
                                                                        </Col>
                                                                    }) : ''
                                                                }
                                                                </Row>
                                                            </Checkbox.Group>
                                                        )
                                                        }
                                                    </Form.Item>
                                                    : ''}
                                        </span>
                                    }) : '' :
                                    null

                            }
                            </div>

                    } */}
                    {
                        disabledCheck == 'true' ?
                            <Row gutter={10}
                                style={
                                    { paddingLeft: '0.4%' }
                                } >
                                <Col span={14} >
                                    <Row gutter={16} >
                                        <Col span={24} >
                                            <Form.Item label="所属队伍" {...formItemLayout2} > {
                                                detail && detail.teams && detail.teams.length > 0 && detail.teams.map((item, index) => {
                                                    return <div key={index}> <span> {item.centerName}/ {item.teamName}</span > <br /></div >
                                                })
                                            }
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            :
                            <div>
                                {
                                    mobileType == 1 || mobileType == 3 || disabledId ?
                                        <div> {formItems} </div> :
                                        null
                                }
                            </div>
                    } {
                        disabledCheck == 'true' ?
                            null :
                            <div> {
                                mobileType == 1 || mobileType == 3 || disabledId ?
                                    <Form.Item {...formItemLayoutWithOutLabel} >
                                        <Button type="dashed"
                                            onClick={add}
                                            style={
                                                { width: '30%' }
                                            }
                                            disabled={disabledCheck == 'true' ? true : false} > < Icon type="plus" />
                                            添加队伍
                                        </Button>
                                    </Form.Item > : null
                            } </div>

                    } {
                        disabledCheck == 'true' || mobileType == 2 ?
                            <Form.Item wrapperCol={
                                { span: 8, offset: 5 }
                            } >
                                <Button className="ml1"
                                    onClick={handleBack} > 返回 </Button>

                            </Form.Item> :
                            <Form.Item wrapperCol={{ span: 8, offset: 3 }} >
                                {
                                    form.getFieldValue('keys').length == 0 && disabledId ?
                                        <Popconfirm title="是否删除该志愿者？"
                                            onConfirm={handleSubmit} >
                                            <Button type="primary" > 提交 </Button>
                                        </Popconfirm > :
                                        <Button type="primary"
                                            loading={loading}
                                            onClick={handleSubmit} >
                                            提交
                                        </Button>
                                }
                                <Button className="ml1" onClick={handleBack} >
                                    取消
                                </Button>
                            </Form.Item>
                    }
                </Form>
            </Card>
            <Modal visible={props.previewVisible} footer={null} onCancel={handleImgCancel.bind(this)}>
                <img alt="img" style={{ width: '100%' }} src={props.previewImage} />
            </Modal>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        ...state.VolunteerAddEditModel,
        loading: state.loading.models.VolunteerAddEditModel
    };
}
export default connect(mapStateToProps)(Form.create()(VolunteerAddEdit));