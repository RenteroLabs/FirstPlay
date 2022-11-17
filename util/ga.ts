export const pageview = (url: string) => {
  try {
    // @ts-ignore
    window.gtag("config", process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
      page_path: url
    })
  } catch (err) {
    console.error(err)
  }
}

export const event = ({ action, params }: any) => {
  try {
    // @ts-ignore
    window.gtag('event', action, params)
  } catch (err) {
    console.error(err)
  }
}