import { Icon } from "components/Icon/Icon";
const Broadcast = ({message, sender, time, date}) => {
    return (
        <div className="py-2 px-3">
        <div className="flex justify-center mb-2">
          <div className="rounded py-1">
            <p className="text-xs uppercase text-[#808080] font-mukta">
             {date}
            </p>
          </div>
        </div>

        <div className="flex-auto">
          <div className="rounded py-6 px-6 bg-[#E6FDFE]">
            <p className="text-xl mt-1 font-mukta">
              {message}
            </p>
            <div className="grid grid-cols-2 mt-3">
              <div>
                <p className="text-left text-xs underline underline-offset-1 font-bold font-mukta text-[#141414]">
                  {sender}
                </p>
              </div>
              <div>
                <p className="text-right text-xs text-[#4D4D4D] font-mukta font-normal">
                  {time}
                  <span className="inline-block pl-2 text-[#4D4D4D]">
                   <Icon name="DoubleCheck" />
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Broadcast;