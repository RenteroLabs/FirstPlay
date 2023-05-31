import React, { ReactElement, useEffect } from "react";
import { NextPageWithLayout } from "./_app";
import { GetStaticProps, GetStaticPropsContext } from "next";

const AuthSuccess: NextPageWithLayout = () => {

  useEffect(() => {
    window.close()
  })

  return <div className=" container flex justify-center items-center h-screen">
    {/* <h2 className=" text-green-500 text-4xl">Successfully authorized Twitter.</h2> */}
  </div>
}


AuthSuccess.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>
}

export default AuthSuccess

export const getStaticProps: GetStaticProps = async ({ locale }: GetStaticPropsContext) => {
  return {
    props: {
      // 获取国际化文案
      messages: (await import(`../i18n/${locale}.json`)).default
    }
  }
}