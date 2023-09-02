import {Layout, message, Space} from 'antd'
import {Content, Footer, Header} from 'antd/es/layout/layout'
import cssVariables from '@/utils/cssVariables'
import HomePageHeader from '@/pages/Home/components/HomePageHeader'
import LoginModal from '@/components/LoginModal'
import React, {useState} from 'react'
import * as api from '@/services/api'
import {history, useModel} from 'umi'
import {setLocalStorage} from '@/utils/localCache'
import {isLogin} from "@/utils";

const HomePageLayout: React.FC = (props: {
    children: React.ReactNode;
}) => {

    const headerStyle: React.CSSProperties = {
        color: cssVariables.fontColorMain,
        height: 100,
        backgroundColor: cssVariables.backgroundColorMain,
    }
    const contentStyle: React.CSSProperties = {
        minHeight: 1000,
        backgroundColor: cssVariables.backgroundColorMain,
        textAlign: 'center',
    }
    const footerStyle: React.CSSProperties = {
        textAlign: 'center',
        color: '#000000',
        backgroundColor: cssVariables.backgroundColorMain,
        borderTop: '1px solid #eeeeee',
    }

    return (
        <Space direction="vertical" style={{width: '100%'}} size={[0, 48]}>
            <LoginModal/>

            <Layout>
                <Header style={headerStyle}>
                    <HomePageHeader/>
                </Header>
                <Content style={contentStyle}>
                    {props.children}
                </Content>
                <Footer style={footerStyle}>
          <span>
            {/*<a href="https://beian.miit.gov.cn" target="_blank">*/}
              {/*  ICP证：合字B2-20220505*/}
              {/*</a>*/}
              &nbsp;&nbsp;
              <a href="https://beian.miit.gov.cn" target="_blank">
              粤ICP备2023014429号
            </a>
              &nbsp;&nbsp;
              地址：深圳市宝安区西乡街道蚝业雅苑b1303
              &nbsp;&nbsp;&nbsp;&nbsp;
          </span>
                    {/*<a target="_blank"*/}
                    {/*   href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44030402006016">*/}
                    {/*  <img*/}

                    {/*    src="https://res.klook.com/image/upload/v1675654921/q2h6btwacsl9z552gc3g.jpg"*/}
                    {/*    className="mt-[-4px]"/>*/}
                    {/*  <span>粤公网安备 44030402006016号</span>*/}
                    {/*</a>*/}
                </Footer>
            </Layout>
        </Space>
    )
}

export default HomePageLayout
