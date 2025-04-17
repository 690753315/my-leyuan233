function getRandomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const arr = [200, 230, 250, 300, 280, 200, 230, 250, 300, 280]

export function getList(l: number = 0, symbol: string = "1"): any[] {
  // const list = [
  //   {
  //     height: 200,
  //     background: "red"
  //   },
  //   {
  //     height: 230,
  //     background: "pink"
  //   },
  //   {
  //     height: 250,
  //     background: "blue"
  //   },
  //   {
  //     height: 300,
  //     background: "pink"
  //   },
  //   {
  //     height: 280,
  //     background: "black"
  //   },
  //   {
  //     height: 200,
  //     background: "deeppink"
  //   },
  //   {
  //     height: 230,
  //     background: "brown"
  //   },
  //   {
  //     height: 250,
  //     background: "skyblue"
  //   },
  //   {
  //     height: 300,
  //     background: "green"
  //   },
  //   {
  //     height: 280,
  //     background: "orange"
  //   }
  // ]

  let list: any[] = []

  // console.log({ randomInteger })
  for (let i = 0; i < 10; i++) {
    const index = l + i

    const randomInteger = getRandomInteger(0, 9)

    // console.log({ randomInteger })
    // console.log({ baseH })

    const height = arr[randomInteger]

    const type = getRandomInteger(0, 1)
    let title = ""
    let about = ""
    let username = ""

    if (symbol === "1") {
      title =
        "【新英雄预告】法术机关枪！符文法师瑞兹上线体验服~Faker×瑞兹联动表情包来了！" +
        index

      about = "英雄联盟" + index

      username = "用户昭昭" + index
    } else {
      title = "【新工具上线】蛋仔排队盲盒模拟器登场啦，快来体验领取吧" + index

      about = "蛋仔派对" + index

      username = "用户热带椰" + index
    }

    const poster = "https://picsum.photos/200/150?" + index + symbol

    list.push({
      height,
      background: `hsl(${randomInteger * 10}, 100%, 50%)`,
      type: type,
      src:
        type === 0
          ? poster
          : [
              "http://vjs.zencdn.net/v/oceans.mp4",
              "https://media.w3.org/2010/05/sintel/trailer.mp4"
            ][i % 2],
      poster,
      title,
      about,
      username,
      zan: getRandomInteger(0, l + i)
    })
  }

  // console.log({ list })

  return list
}
