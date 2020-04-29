import React, { useState, useEffect } from 'react'
import './../styles/SlideCompanion.css'
import './../styles/SlideSponsor.css'
import gold from './../../../assets/gold.png'
import diamond from './../../../assets/diamond.png'
import silver from './../../../assets/silver.png'
export default function SlideSponsor() {
  const [mem, setMem] = useState([
    {
      image:
        'https://scontent.fhan3-3.fna.fbcdn.net/v/t1.0-9/s960x960/83794155_2551944795024669_2545637553109729280_o.jpg?_nc_cat=106&_nc_sid=174925&_nc_ohc=53sKtee5ck8AX-Xj6vy&_nc_ht=scontent.fhan3-3.fna&_nc_tp=7&oh=66cadfc19efac5623ca9f732e8401024&oe=5EC3BA88',
      name: 'Nguyễn Văn Học',
      khoa: 'D18',
      rank: 'diamond'
    },
    {
      image:
        'https://scontent.fhan4-1.fna.fbcdn.net/v/t1.0-9/s960x960/79406775_2390572367922230_7389855695102803968_o.jpg?_nc_cat=104&_nc_sid=174925&_nc_ohc=4jwSTXuc4bMAX8kkd3w&_nc_ht=scontent.fhan4-1.fna&_nc_tp=7&oh=ab962b3fdec05ee12d0bed8f31393a59&oe=5EC2F2BB',
      name: 'Trần Minh Quang',
      khoa: 'D18',
      rank: 'diamond'
    },
    {
      image:
        'https://scontent.fhan3-2.fna.fbcdn.net/v/t1.0-9/62067740_2383088618605081_8412783516210692096_n.jpg?_nc_cat=111&_nc_sid=174925&_nc_ohc=mIowPTIiS-kAX-mq5QS&_nc_ht=scontent.fhan3-2.fna&oh=5b45af6b3d8a15f61f6c604a4c679f55&oe=5EC48BF5',
      name: 'Nguyễn Việt Hương',
      khoa: 'D18',
      rank: 'silver'
    },
    {
      image:
        'https://scontent.fhan3-2.fna.fbcdn.net/v/t31.0-8/p960x960/17359037_1985626588331570_566222989922575259_o.jpg?_nc_cat=111&_nc_sid=174925&_nc_ohc=6f5PqvqLyOcAX9YXZfs&_nc_ht=scontent.fhan3-2.fna&_nc_tp=6&oh=16780da9a162d16e215fad4760fa2de7&oe=5EC36320',
      name: 'Nguyễn Tiến Hải',
      khoa: 'D17',
      rank: 'diamond'
    },
    {
      image:
        'https://scontent.fhan3-1.fna.fbcdn.net/v/t1.0-9/s960x960/81728579_1419518378201108_7874011037505159168_o.jpg?_nc_cat=102&_nc_sid=174925&_nc_ohc=oHWFB_LNsaQAX-_zTJM&_nc_ht=scontent.fhan3-1.fna&_nc_tp=7&oh=1b213bb14fccf5549035716efe0e6ab9&oe=5EC5636A',
      name: 'Đô Đô',
      khoa: 'D17',
      rank: 'diamond'
    },
    {
      image:
        'https://scontent.fhan3-1.fna.fbcdn.net/v/t1.0-9/s960x960/81728579_1419518378201108_7874011037505159168_o.jpg?_nc_cat=102&_nc_sid=174925&_nc_ohc=oHWFB_LNsaQAX-_zTJM&_nc_ht=scontent.fhan3-1.fna&_nc_tp=7&oh=1b213bb14fccf5549035716efe0e6ab9&oe=5EC5636A',
      name: 'Đô Đô 4',
      khoa: 'D17',
      rank: 'gold'
    },
    {
      image:
        'https://scontent.fhan3-1.fna.fbcdn.net/v/t1.0-9/s960x960/81728579_1419518378201108_7874011037505159168_o.jpg?_nc_cat=102&_nc_sid=174925&_nc_ohc=oHWFB_LNsaQAX-_zTJM&_nc_ht=scontent.fhan3-1.fna&_nc_tp=7&oh=1b213bb14fccf5549035716efe0e6ab9&oe=5EC5636A',
      name: 'Đô Đô 3',
      khoa: 'D17',
      rank: 'gold'
    },
    {
      image:
        'https://scontent.fhan3-1.fna.fbcdn.net/v/t1.0-9/s960x960/81728579_1419518378201108_7874011037505159168_o.jpg?_nc_cat=102&_nc_sid=174925&_nc_ohc=oHWFB_LNsaQAX-_zTJM&_nc_ht=scontent.fhan3-1.fna&_nc_tp=7&oh=1b213bb14fccf5549035716efe0e6ab9&oe=5EC5636A',
      name: 'Đô Đô 2',
      khoa: 'D17',
      rank: 'silver'
    },
    {
      image:
        'https://scontent.fhan3-1.fna.fbcdn.net/v/t1.0-9/s960x960/81728579_1419518378201108_7874011037505159168_o.jpg?_nc_cat=102&_nc_sid=174925&_nc_ohc=oHWFB_LNsaQAX-_zTJM&_nc_ht=scontent.fhan3-1.fna&_nc_tp=7&oh=1b213bb14fccf5549035716efe0e6ab9&oe=5EC5636A',
      name: 'Đô Đô 1',
      khoa: 'D17',
      rank: 'silver'
    },
    {
      image:
        'https://scontent.fhan3-1.fna.fbcdn.net/v/t1.0-9/s960x960/81728579_1419518378201108_7874011037505159168_o.jpg?_nc_cat=102&_nc_sid=174925&_nc_ohc=oHWFB_LNsaQAX-_zTJM&_nc_ht=scontent.fhan3-1.fna&_nc_tp=7&oh=1b213bb14fccf5549035716efe0e6ab9&oe=5EC5636A',
      name: 'Đô Đô 6',
      khoa: 'D17',
      rank: 'silver'
    },
    {
      image:
        'https://scontent.fhan3-1.fna.fbcdn.net/v/t1.0-9/s960x960/81728579_1419518378201108_7874011037505159168_o.jpg?_nc_cat=102&_nc_sid=174925&_nc_ohc=oHWFB_LNsaQAX-_zTJM&_nc_ht=scontent.fhan3-1.fna&_nc_tp=7&oh=1b213bb14fccf5549035716efe0e6ab9&oe=5EC5636A',
      name: 'Đô Đô 7',
      khoa: 'D17',
      rank: 'silver'
    },
    {
      image:
        'https://scontent.fhan3-1.fna.fbcdn.net/v/t1.0-9/s960x960/81728579_1419518378201108_7874011037505159168_o.jpg?_nc_cat=102&_nc_sid=174925&_nc_ohc=oHWFB_LNsaQAX-_zTJM&_nc_ht=scontent.fhan3-1.fna&_nc_tp=7&oh=1b213bb14fccf5549035716efe0e6ab9&oe=5EC5636A',
      name: 'Đô Đô 10',
      khoa: 'D17',
      rank: 'gold'
    },
    {
      image:
        'https://scontent.fhan3-1.fna.fbcdn.net/v/t1.0-9/s960x960/81728579_1419518378201108_7874011037505159168_o.jpg?_nc_cat=102&_nc_sid=174925&_nc_ohc=oHWFB_LNsaQAX-_zTJM&_nc_ht=scontent.fhan3-1.fna&_nc_tp=7&oh=1b213bb14fccf5549035716efe0e6ab9&oe=5EC5636A',
      name: 'Đô Đô 9',
      khoa: 'D17',
      rank: 'gold'
    }
  ])

  const [indexGold, setIndexGold] = useState({
    index1: 0,
    index2: 1,
    index3: 2
  })
  const [indexSilver, setIndexSilver] = useState({
    index1: 0,
    index2: 1,
    index3: 2
  })
  const [indexDiamond, setIndexDiamond] = useState({
    index1: 0,
    index2: 1,
    index3: 2
  })

  const [goldRank, setGoldRank] = useState(
    mem.filter((member) => {
      return member.rank === 'gold'
    })
  )

  const [silverRank, setSilverRank] = useState(
    mem.filter((member) => {
      return member.rank === 'silver'
    })
  )

  const [diamondRank, setDiamondRank] = useState(
    mem.filter((member) => {
      return member.rank === 'diamond'
    })
  )
  var carouselInterval
  const startCarousel = () => {
    carouselInterval = setInterval(() => {
      toLeftDiamond()
      toLeftGold()
      toLeftSilver()
    }, 4000)
  }

  useEffect(() => {
    startCarousel()
    return () => {
      clearInterval(carouselInterval)
    }
  })

  const toLeftGold = () => {
    if (indexGold.index3 === goldRank.length - 1) {
      setIndexGold({
        index1: 0,
        index2: 1,
        index3: 2
      })
    } else {
      setIndexGold({
        index1: indexGold.index1 + 1,
        index2: indexGold.index2 + 1,
        index3: indexGold.index3 + 1
      })
    }
  }
  const toRightGold = () => {
    if (indexGold.index1 === 0) {
      setIndexGold({
        index1: goldRank.length - 3,
        index2: goldRank.length - 2,
        index3: goldRank.length - 1
      })
    } else {
      setIndexGold({
        index1: indexGold.index1 - 1,
        index2: indexGold.index2 - 1,
        index3: indexGold.index3 - 1
      })
    }
  }
  const toLeftDiamond = () => {
    if (indexDiamond.index3 === diamondRank.length - 1) {
      setIndexDiamond({
        index1: 0,
        index2: 1,
        index3: 2
      })
    } else {
      setIndexDiamond({
        index1: indexDiamond.index1 + 1,
        index2: indexDiamond.index2 + 1,
        index3: indexDiamond.index3 + 1
      })
    }
  }
  const toRightDiamond = () => {
    if (indexDiamond.index1 === 0) {
      setIndexDiamond({
        index1: diamondRank.length - 3,
        index2: diamondRank.length - 2,
        index3: diamondRank.length - 1
      })
    } else {
      setIndexDiamond({
        index1: indexDiamond.index1 - 1,
        index2: indexDiamond.index2 - 1,
        index3: indexDiamond.index3 - 1
      })
    }
  }
  const toLeftSilver = () => {
    if (indexSilver.index3 === silverRank.length - 1) {
      setIndexSilver({
        index1: 0,
        index2: 1,
        index3: 2
      })
    } else {
      setIndexSilver({
        index1: indexSilver.index1 + 1,
        index2: indexSilver.index2 + 1,
        index3: indexSilver.index3 + 1
      })
    }
  }
  const toRightSilver = () => {
    if (indexSilver.index1 === 0) {
      setIndexSilver({
        index1: silverRank.length - 3,
        index2: silverRank.length - 2,
        index3: silverRank.length - 1
      })
    } else {
      setIndexSilver({
        index1: indexSilver.index1 - 1,
        index2: indexSilver.index2 - 1,
        index3: indexSilver.index3 - 1
      })
    }
  }
  var showPeopleGold = (
    <div className='list-people'>
      <div className='show-people'>
        <div
          className='ava-spon'
          style={{
            backgroundImage: 'url(' + goldRank[indexGold.index1].image + ')'
          }}
        ></div>
        <p className='name-spon'>{goldRank[indexGold.index1].name}</p>
        <p className='khoa-spon'>{goldRank[indexGold.index1].khoa}</p>
      </div>
      <div className='show-people'>
        <div
          className='ava-spon'
          style={{
            backgroundImage: 'url(' + goldRank[indexGold.index2].image + ')'
          }}
        ></div>
        <p className='name-spon'>{goldRank[indexGold.index2].name}</p>
        <p className='khoa-spon'>{goldRank[indexGold.index2].khoa}</p>
      </div>
      <div className='show-people'>
        <div
          className='ava-spon'
          style={{
            backgroundImage: 'url(' + goldRank[indexGold.index3].image + ')'
          }}
        ></div>
        <p className='name-spon'>{goldRank[indexGold.index3].name}</p>
        <p className='khoa-spon'>{goldRank[indexGold.index3].khoa}</p>
      </div>
    </div>
  )
  var showPeopleDiamond = (
    <div className='list-people'>
      <div className='show-people'>
        <div
          className='ava-spon'
          style={{
            backgroundImage:
              'url(' + diamondRank[indexDiamond.index1].image + ')'
          }}
        ></div>
        <p className='name-spon'>{diamondRank[indexDiamond.index1].name}</p>
        <p className='khoa-spon'>{diamondRank[indexDiamond.index1].khoa}</p>
      </div>
      <div className='show-people'>
        <div
          className='ava-spon'
          style={{
            backgroundImage:
              'url(' + diamondRank[indexDiamond.index2].image + ')'
          }}
        ></div>
        <p className='name-spon'>{diamondRank[indexDiamond.index2].name}</p>
        <p className='khoa-spon'>{diamondRank[indexDiamond.index2].khoa}</p>
      </div>
      <div className='show-people'>
        <div
          className='ava-spon'
          style={{
            backgroundImage:
              'url(' + diamondRank[indexDiamond.index3].image + ')'
          }}
        ></div>
        <p className='name-spon'>{diamondRank[indexDiamond.index3].name}</p>
        <p className='khoa-spon'>{diamondRank[indexDiamond.index3].khoa}</p>
      </div>
    </div>
  )
  var showPeopleSilver = (
    <div className='list-people'>
      <div className='show-people'>
        <div
          className='ava-spon'
          style={{
            backgroundImage: 'url(' + silverRank[indexSilver.index1].image + ')'
          }}
        ></div>
        <p className='name-spon'>{silverRank[indexSilver.index1].name}</p>
        <p className='khoa-spon'>{silverRank[indexSilver.index1].khoa}</p>
      </div>
      <div className='show-people'>
        <div
          className='ava-spon'
          style={{
            backgroundImage: 'url(' + silverRank[indexSilver.index2].image + ')'
          }}
        ></div>
        <p className='name-spon'>{silverRank[indexSilver.index2].name}</p>
        <p className='khoa-spon'>{silverRank[indexSilver.index2].khoa}</p>
      </div>
      <div className='show-people'>
        <div
          className='ava-spon'
          style={{
            backgroundImage: 'url(' + silverRank[indexSilver.index3].image + ')'
          }}
        ></div>
        <p className='name-spon'>{silverRank[indexSilver.index3].name}</p>
        <p className='khoa-spon'>{silverRank[indexSilver.index3].khoa}</p>
      </div>
    </div>
  )

  return (
    <div className='sponsors'>
      <div className='diamond'>
        <div className='cup-diamond'>
          <img className='image' src={diamond} alt='diamond' />
        </div>
        <div className='show-sponsor'>
          <i
            className='fa fa-angle-left control-sponsor control-diamond'
            onClick={toLeftDiamond}
          ></i>
          {showPeopleDiamond}
          <i
            className='fa fa-angle-right control-sponsor control-diamond'
            onClick={toRightDiamond}
          ></i>
        </div>
      </div>
      <div className='gold'>
        <div className='cup-gold'>
          <img className='image' src={gold} alt='gold' />
        </div>
        <div className='show-sponsor'>
          <i
            className='fa fa-angle-left control-sponsor control-gold'
            onClick={toLeftGold}
          ></i>
          {showPeopleGold}
          <i
            className='fa fa-angle-right control-sponsor control-gold'
            onClick={toRightGold}
          ></i>
        </div>
      </div>
      <div className='silver'>
        <div className='cup-silver'>
          <img className='image' src={silver} alt='silver' />
        </div>
        <div className='show-sponsor'>
          <i
            className='fa fa-angle-left control-sponsor control-silver'
            onClick={toLeftSilver}
          ></i>
          {showPeopleSilver}
          <i
            className='fa fa-angle-right control-sponsor control-silver'
            onClick={toRightSilver}
          ></i>
        </div>
      </div>
    </div>
  )
}
