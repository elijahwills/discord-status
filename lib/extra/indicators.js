const { icons, colors } = require("./config.json");

module.exports.indicators = {
  none: { color: colors.none || 0x57f287, icon: icons.none || "" },
  minor: { color: colors.minor || 0xfee75c, icon: icons.minor || "" },
  major: { color: colors.major || 0xff7f50, icon: icons.major || "" },
  critical: { color: colors.critical || 0xed4245, icon: icons.critical || "" },
  unknown: { color: colors.unknown || 0x5865f2, icon: icons.unknown || "" },
};

module.exports.log = class {
  constructor(title, content, type = "good") {
    this.title = title;
    this.content = content;
    this.type = type;
  }
};
