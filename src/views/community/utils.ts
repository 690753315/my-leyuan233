function getRandomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function getList(l: number = 0): any[] {
  const arr = [200, 230, 250, 300, 280, 200, 230, 250, 300, 280]

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
  for (let i = 0; i < 16; i++) {
    const randomInteger = getRandomInteger(0, 9)

    // console.log({ randomInteger })
    // console.log({ baseH })

    const height = arr[randomInteger]

    const type = getRandomInteger(0, 1)

    list.push({
      height,
      background: `hsl(${randomInteger * 10}, 100%, 50%)`,
      type: type,
      src:
        type === 0
          ? "https://picsum.photos/300/200?" + (l + i)
          : [
              "http://vjs.zencdn.net/v/oceans.mp4",
              "https://media.w3.org/2010/05/sintel/trailer.mp4"
            ][i % 2],
      poster: "https://picsum.photos/300/200?" + (l + i),
      title:
        "【新英雄预告】法术机关枪！符文法师瑞兹上线体验服~Faker×瑞兹联动表情包来了！" +
        (l + i),
      about: "英雄联盟" + (l + i),
      username: "用户昭昭" + (l + i),
      zan: +(l + i)
    })
  }

  // console.log({ list })

  return list
}
