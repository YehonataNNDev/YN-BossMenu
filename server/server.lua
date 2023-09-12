QBCore = nil

local QBCore = exports['qb-core']:GetCoreObject()

QBCore.Functions.CreateCallback('getBusinessData', function(source, cb)
    local Player = QBCore.Functions.GetPlayer(source)
    local job = Player.PlayerData.job.name
    if(Player.PlayerData.job.isboss == true) then
        local datatosend = {}


        datatosend.info = Config.Informations.HeaderInfo
        datatosend.infoList = Config.Informations.BoxInfos
        datatosend.EmployeeInviteBox = Config.Informations.EmployeeInviteBox

        
        exports["oxmysql"]:execute('SELECT amount FROM management_funds WHERE job_name = @jobName', {['@jobName'] = job}, function(result2)
            exports["oxmysql"]:execute("SELECT * FROM players WHERE job LIKE @query", {["@query"] = '%'..job..'%'}, function(result)
                local players = {}
                if(result[1] ~= nil) then
                    for k,v in pairs(result) do
                        table.insert(players , {PlayerName = json.decode(v.charinfo).firstname..' '..json.decode(v.charinfo).lastname  , cid = v.citizenid , salary = json.decode(v.job).payment , playerRank = Player.PlayerData.job.grade.level})
                    end
                end
                
                exports["oxmysql"]:execute('SELECT * FROM boss_menu WHERE jobName = @jobName', {['@jobName'] = job}, function(historyResult)
                    if(historyResult[1] ~= nil) then
                        datatosend.employees = players

                        local businessDATA = {}
                        businessDATA.amount = result2[1].amount
                        datatosend.bHistory = json.decode(historyResult[1].businessHistory)
                        datatosend.business = businessDATA
                        datatosend.JobRanks = {QBCore.Shared.Jobs[job].grades}
                        datatosend.player = {FirstName = Player.PlayerData.charinfo.firstname, LastName = Player.PlayerData.charinfo.lastname , rank = Player.PlayerData.job.grade.name}
                        local playersList = {}
                        for k, v in pairs(QBCore.Functions.GetPlayers()) do
                            local targetPlayer = QBCore.Functions.GetPlayer(v)
                            if(targetPlayer.PlayerData.job.name == job) then
                                table.insert(playersList , {name = targetPlayer.PlayerData.charinfo.firstname..' '..targetPlayer.PlayerData.charinfo.lastname..' ('..v..')', cid = targetPlayer.PlayerData.citizenid})
                            end
                        end
                        datatosend.players = playersList
                        cb(datatosend)
                    else
                        exports["oxmysql"]:execute('INSERT INTO boss_menu (jobName , businessHistory) VALUES (@jobName , @businessHistory)', {['@jobName'] = job, ['@businessHistory'] = json.encode({})}, function(historyResult)
                            exports["oxmysql"]:execute('SELECT * FROM boss_menu WHERE jobName = @jobName', {['@jobName'] = job}, function(historyResultNew)
                                datatosend.employees = players

                                local businessDATA = {}
                                businessDATA.amount = result2[1].amount
                                datatosend.bHistory = json.decode(historyResultNew[1].businessHistory)
                                datatosend.business = businessDATA
                                datatosend.JobRanks = {QBCore.Shared.Jobs[job].grades}
                                datatosend.player = {FirstName = Player.PlayerData.charinfo.firstname, LastName = Player.PlayerData.charinfo.lastname , rank = Player.PlayerData.job.grade.name}
                                local playersList = {}
                                for k, v in pairs(QBCore.Functions.GetPlayers()) do
                                    local targetPlayer = QBCore.Functions.GetPlayer(v)
                                    if(targetPlayer.PlayerData.job.name ~= job) then
                                        table.insert(playersList , {name = targetPlayer.PlayerData.charinfo.firstname..' '..targetPlayer.PlayerData.charinfo.lastname..' ('..v..')', cid = targetPlayer.PlayerData.citizenid})
                                    end
                                end
                                datatosend.players = playersList
                                cb(datatosend)
                            end)
                        end)
                    end
                end)
            end)
        end)
    end
end)

QBCore.Functions.CreateCallback('updateBusinessData', function(source, cb, data)
    local Player = QBCore.Functions.GetPlayer(source)
    local job = Player.PlayerData.job.name
    if(Player.PlayerData.job.isboss == true) then
        
        if(data.playersToUpdate[1] ~= nil) then
           
            for k,v in pairs(data.playersToUpdate) do
                local index = 1
                for k,v in pairs(data.data) do
                    if(v.cid == Player.PlayerData.citizenid) then
                        index = k
                    end
                end
                exports["oxmysql"]:execute('SELECT * FROM players WHERE citizenid = @cid', {['@cid'] = v}, function(playerData)
                    local Employee = QBCore.Functions.GetPlayerByCitizenId(v)                    
                    if Employee then
                        local newJob = {}
                        newJob = json.decode(playerData[1].job)
                        newJob.payment = data.data[index].salary
                        exports.oxmysql:execute("UPDATE players SET job = ? WHERE citizenid = ?", { json.encode(newJob), v })
                        Employee.Functions.SetJob(job,  data.data[index].playerRank)
                        TriggerClientEvent('QBCore:Notify', source, "Data updated!", "success")
                    else
                        TriggerClientEvent('QBCore:Notify', source, "Civilian not in city.", "error")
                    end
                  
                   
                end)
            end
               

        end
    end
end)

RegisterNetEvent('bossmenu:addLog')
AddEventHandler('bossmenu:addLog' , function(action , note, amount)
    local Player = QBCore.Functions.GetPlayer(source)
    local job = Player.PlayerData.job.name
    exports["oxmysql"]:execute('SELECT * FROM boss_menu WHERE jobName = @jobName', {['@jobName'] = job}, function(oldData)
        local newdata = json.decode(oldData[1].businessHistory)
        table.insert(newdata , {amount = amount , action = action , note = note})
        exports.oxmysql:execute("UPDATE boss_menu SET businessHistory = ? WHERE jobName = ?", { json.encode(newdata), job })
    end)
end)

QBCore.Functions.CreateCallback('employeeActionServer', function(source, cb, data)
    local Player = QBCore.Functions.GetPlayer(source)
    local Target = QBCore.Functions.GetPlayerByCitizenId(data.cid)
    if(data.action == 'hire') then
        if(Target ~= nil) then
            Target.Functions.SetJob(Player.PlayerData.job.name, data.rank)
            exports["oxmysql"]:execute('SELECT * FROM players WHERE citizenid = @cid', {['@cid'] = data.cid}, function(playerData)
                    local newJob = {}
                    newJob = json.decode(playerData[1].job)
                    newJob.payment = data.salary
                    exports.oxmysql:execute("UPDATE players SET job = ? WHERE citizenid = ?", { json.encode(newJob), data.cid })               
            end)
            TriggerClientEvent('QBCore:Notify', source, "Job added to the player!", "success")

        end
    else
        if(Target ~= nil) then
            Target.Functions.SetJob("unemployed", '0')
            TriggerClientEvent('QBCore:Notify', source, "Player fired!", "success")
            TriggerClientEvent('QBCore:Notify', Target, "You have been fired, good luck!", "error")
        end
    end
    cb('o')
end)
