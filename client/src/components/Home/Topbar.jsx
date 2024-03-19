import React from 'react'
import {Link} from 'react-router-dom'

const Topbar = ({search,setTag,menu,home,link}) => {

  return (
    <div>
          <ul className="border-b dark:border-gray-700 pb-[-200px] flex gap-2 sm:gap-6">
         {home &&  <Link onClick={() => setTag('')} to={'/'} className={`${
                  search === '' &&
                  'text-gray-800 dark:text-gray-200 font-semibold border-b border-gray-500 dark:border-gray-300 pb-3 -mb-[1px]'
                } cursor-pointer capitalize`}
              >For you</Link>}
          {menu.map((item, index) =>
            
              <Link
                id={item}
                to={`${link}${item}`}

                key={index}
                className={`${
                  search === item &&
                  'border-b border-gray-500 text-gray-800 dark:text-gray-200 font-semibold dark:border-gray-300 pb-3 -mb-[1px]'
                } cursor-pointer capitalize`}
              >
                {item}
              </Link>
            )
          }
        </ul>
    </div>

  )
}

export default Topbar