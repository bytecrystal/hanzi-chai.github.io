import { ChangeEvent, Dispatch, PropsWithChildren, useContext } from "react";
import { Button, Layout, Menu, Typography } from "antd";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  CaretLeftFilled,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { ConfigContext, DispatchContext } from "./Context";
import { Config } from "../lib/chai";
import { Action } from "./Context";
import { Page } from "./App";
import styled from "styled-components";

const items: MenuProps["items"] = [
  {
    label: "基本",
    key: "info",
    icon: <MailOutlined />,
  },
  {
    label: "数据",
    key: "data",
    icon: <AppstoreOutlined />,
  },
  {
    label: "规则",
    key: "rule",
    icon: <SettingOutlined />,
  },
  {
    label: "字根",
    key: "root",
    icon: <SettingOutlined />,
  },
  {
    label: "拆分",
    key: "result",
    icon: <SettingOutlined />,
  },
];

const exportFile = (config: Config) => {
  const fileContent = JSON.stringify(config);
  const blob = new Blob([fileContent], { type: "text/plain" });
  const a = document.createElement("a");
  a.download = `${config.info.id}.json`;
  a.href = window.URL.createObjectURL(blob);
  a.click();
};

const importFile = (
  dispatch: Dispatch<Action>,
  e: ChangeEvent<HTMLInputElement>
) => {
  const [file] = e.target.files!;
  const reader = new FileReader();
  reader.addEventListener("load", () =>
    dispatch({
      type: "load",
      content: JSON.parse(reader.result as string),
    })
  );
  reader.readAsText(file);
};

const NameAndBack = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 1.5rem;
  color: white;
`;

const Header = styled(Layout.Header)`
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: sticky;
  top: 0;
`;

const Content = styled(Layout.Content)`
  padding: 0px 32px;
`

const Footer = styled(Layout.Footer)`
  position: fixed;
  width: 100%;
  bottom: 0;
  text-align: center;
`;

const ActionGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

export default function EditorLayout({
  children,
  page,
  setPage,
}: PropsWithChildren<{ page: string; setPage: (a: Page) => void }>) {
  const config = useContext(ConfigContext);
  const dispatch = useContext(DispatchContext);
  return (
    <Layout>
      <Header>
        <NameAndBack>
          <Button
            icon={<CaretLeftFilled />}
            onClick={() => {
              localStorage.setItem(config.info.id, JSON.stringify(config));
              setPage("home");
            }}
          />
          <Title>{config.info.name}</Title>
        </NameAndBack>
        <Menu
          onClick={(e) => setPage(e.key as Page)}
          selectedKeys={[page]}
          theme="dark"
          mode="horizontal"
          items={items}
        />
        <ActionGroup>
          <Button onClick={() => document.getElementById("import")!.click()}>
            导入
          </Button>
          <input
            type="file"
            id="import"
            hidden
            onChange={(e) => importFile(dispatch, e)}
          />
          <Button onClick={() => exportFile(config)}>导出</Button>
        </ActionGroup>
      </Header>
      <Content>{children}</Content>
      <Footer>
        © 汉字自动拆分开发团队 2019 - {new Date().getFullYear()}
      </Footer>
    </Layout>
  );
}
