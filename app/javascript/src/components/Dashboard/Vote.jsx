import { Typography } from "antd";
import classNames from "classnames";
import { DownArrow, UpArrow } from "neetoicons";
import { Button } from "neetoui";

const Vote = ({ upvoteHandler, downvoteHandler, voteValue, votesCount }) => (
  <div className="flex flex-col items-center justify-between">
    <Button
      icon={UpArrow}
      style="text"
      className={classNames("font-bold", {
        "text-green-600": voteValue > 0,
      })}
      onClick={upvoteHandler}
    />
    <Typography>{votesCount}</Typography>
    <Button
      icon={DownArrow}
      style="text"
      className={classNames("font-bold", {
        "text-red-600": voteValue < 0,
      })}
      onClick={downvoteHandler}
    />
  </div>
);

export default Vote;
